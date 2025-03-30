
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Defina os cabeçalhos CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentPayload {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string | null;
}

serve(async (req) => {
  // Lidar com solicitações OPTIONS (preflight CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Crie um cliente Supabase com as credenciais de serviço
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Obtenha o corpo da requisição
    const payload: AppointmentPayload = await req.json();

    // Validar dados obrigatórios
    if (!payload.name || !payload.name.trim()) {
      return new Response(JSON.stringify({ error: "Nome é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!payload.email || !payload.email.trim()) {
      return new Response(JSON.stringify({ error: "Email é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!payload.subject || !payload.subject.trim()) {
      return new Response(JSON.stringify({ error: "Assunto é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Primeiro, criar ou atualizar o cliente
    const { data: clientData, error: clientError } = await supabaseClient
      .from('clients')
      .upsert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null
      }, {
        onConflict: 'email'
      })
      .select('id')
      .single();

    if (clientError) {
      console.error("Erro ao criar/encontrar cliente:", clientError);
      return new Response(JSON.stringify({ error: "Erro ao criar cliente" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Definir data do agendamento para o próximo dia útil às 14:00
    const appointmentDate = getNextBusinessDay();

    // Criar agendamento
    const { data: appointmentData, error: appointmentError } = await supabaseClient
      .from('appointments')
      .insert({
        client_id: clientData.id,
        subject: payload.subject,
        message: payload.message || null,
        appointment_date: appointmentDate.toISOString(),
        status: 'pending'
      });

    if (appointmentError) {
      console.error("Erro ao criar agendamento:", appointmentError);
      return new Response(JSON.stringify({ error: "Erro ao criar agendamento" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Consulta agendada com sucesso" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    return new Response(JSON.stringify({ error: "Erro ao processar solicitação" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Função auxiliar para obter o próximo dia útil às 14:00
function getNextBusinessDay(): Date {
  const date = new Date();
  date.setHours(14, 0, 0, 0); // Definir para 14:00
  
  // Adicionar 1 dia
  date.setDate(date.getDate() + 1);
  
  // Se for fim de semana, ajustar para segunda-feira
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 6) { // Sábado
    date.setDate(date.getDate() + 2);
  } else if (dayOfWeek === 0) { // Domingo
    date.setDate(date.getDate() + 1);
  }
  
  return date;
}
