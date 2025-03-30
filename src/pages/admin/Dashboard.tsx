
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertCircle, Plus, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Appointment = {
  id: string;
  subject: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  client: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          subject,
          appointment_date,
          status,
          client:client_id(name, email, phone)
        `)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast.error("Erro ao buscar consultas", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'completed' | 'canceled') {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      ));
      
      toast.success("Status atualizado", {
        description: "O status da consulta foi atualizado com sucesso."
      });
    } catch (error: any) {
      toast.error("Erro ao atualizar status", {
        description: error.message
      });
    }
  }

  async function moveToClients(appointmentId: string) {
    try {
      // Using the function we created in SQL
      const { data, error } = await supabase
        .rpc('appointment_to_client', { appointment_id: appointmentId });

      if (error) throw error;

      if (!data) {
        toast.error("Erro ao mover para clientes", {
          description: "Cliente não encontrado ou já existe"
        });
        return;
      }

      toast.success("Cliente movido com sucesso", {
        description: "As informações foram atualizadas no cadastro de clientes."
      });

      setDialogOpen(false);
    } catch (error: any) {
      toast.error("Erro ao mover para clientes", {
        description: error.message
      });
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function translateStatus(status: string) {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Concluída';
      case 'canceled': return 'Cancelada';
      default: return status;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Consultas</h1>
        <Button onClick={fetchAppointments} variant="outline">
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">Nenhuma consulta encontrada</h3>
          <p className="text-gray-500 mt-2">
            Não há consultas agendadas no momento.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.client?.name || "Cliente não encontrado"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{appointment.client?.email}</span>
                      <span>{appointment.client?.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {format(new Date(appointment.appointment_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {format(new Date(appointment.appointment_date), "HH:mm")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {translateStatus(appointment.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Select
                        value={appointment.status}
                        onValueChange={(value: any) => updateAppointmentStatus(appointment.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Alterar status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="confirmed">Confirmada</SelectItem>
                          <SelectItem value="completed">Concluída</SelectItem>
                          <SelectItem value="canceled">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>

                      <Dialog open={dialogOpen && selectedAppointmentId === appointment.id} 
                             onOpenChange={(open) => {
                               setDialogOpen(open);
                               if (!open) setSelectedAppointmentId(null);
                             }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => setSelectedAppointmentId(appointment.id)}
                          >
                            <User className="h-4 w-4" />
                            <span>Cliente</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Mover para Clientes</DialogTitle>
                            <DialogDescription>
                              Deseja adicionar ou atualizar este cliente no cadastro de clientes?
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-1">Nome</p>
                                <p className="text-sm">{appointment.client?.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Email</p>
                                <p className="text-sm">{appointment.client?.email}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Telefone</p>
                                <p className="text-sm">{appointment.client?.phone || "Não informado"}</p>
                              </div>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" 
                                   onClick={() => {
                                     setDialogOpen(false);
                                     setSelectedAppointmentId(null);
                                   }}>
                              Cancelar
                            </Button>
                            <Button 
                              onClick={() => moveToClients(appointment.id)}
                              className="flex items-center gap-1"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Adicionar/Atualizar</span>
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
