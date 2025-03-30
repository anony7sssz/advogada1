
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";

export default function Finance() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data
  const revenueData = [
    { month: "Jan", receita: 4000, despesas: 2400 },
    { month: "Fev", receita: 3000, despesas: 1398 },
    { month: "Mar", receita: 9800, despesas: 2000 },
    { month: "Abr", receita: 2780, despesas: 3908 },
    { month: "Mai", receita: 1890, despesas: 4800 },
    { month: "Jun", receita: 2390, despesas: 3800 },
    { month: "Jul", receita: 3490, despesas: 4300 },
  ];
  
  const pieData = [
    { name: 'Contratos', value: 65 },
    { name: 'Consultorias', value: 25 },
    { name: 'Outros', value: 10 }
  ];
  
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5'];
  
  const clientData = [
    { month: "Jan", novos: 4, recorrentes: 12 },
    { month: "Fev", novos: 3, recorrentes: 13 },
    { month: "Mar", novos: 9, recorrentes: 15 },
    { month: "Abr", novos: 5, recorrentes: 18 },
    { month: "Mai", novos: 7, recorrentes: 20 },
    { month: "Jun", novos: 2, recorrentes: 20 },
    { month: "Jul", novos: 8, recorrentes: 22 },
  ];

  const handleDownload = () => {
    toast({
      title: "Relatório baixado",
      description: "O relatório financeiro foi gerado com sucesso.",
    });
  };

  const handleAddRevenue = () => {
    toast({
      title: "Recurso em desenvolvimento",
      description: "O módulo de registro financeiro estará disponível em breve.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight gradient-text">
          Gestão Financeira
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleAddRevenue} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Novo Registro</span>
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">R$ 24.350,00</div>
            <p className="text-xs text-gray-500">+20.1% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card className="bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">+28</div>
            <p className="text-xs text-gray-500">+12 novos nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card className="bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Valor Médio por Caso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-text">R$ 2.450,00</div>
            <p className="text-xs text-gray-500">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader>
            <CardTitle>Receitas x Despesas</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#7E69AB', 
                    color: '#fff' 
                  }} 
                />
                <Legend />
                <Bar dataKey="receita" fill="#9b87f5" name="Receita" />
                <Bar dataKey="despesas" fill="#6E59A5" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader>
            <CardTitle>Distribuição de Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#7E69AB',
                    color: '#fff' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 bg-lawyer-black/50 border-lawyer-purple/20">
          <CardHeader>
            <CardTitle>Crescimento de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={clientData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#7E69AB',
                    color: '#fff' 
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="novos" stroke="#9b87f5" name="Novos Clientes" />
                <Line type="monotone" dataKey="recorrentes" stroke="#D6BCFA" name="Clientes Recorrentes" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
