
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ExportDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exportType, setExportType] = useState<'all' | 'period'>('all');
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  ); // First day of current month
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  ); // Today

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('financial_records').select('*');
      
      if (exportType === 'period') {
        query = query
          .gte('record_date', startDate)
          .lte('record_date', endDate);
      }
      
      const { data, error } = await query.order('record_date', { ascending: false });
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        toast({
          title: "Nenhum registro encontrado",
          description: "Não existem registros financeiros para exportar no período selecionado.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Convert data to CSV
      const headers = ['Descrição', 'Valor', 'Tipo', 'Categoria', 'Data'];
      let csv = headers.join(',') + '\n';
      
      data.forEach(record => {
        const row = [
          `"${record.description}"`,
          record.amount,
          record.record_type,
          `"${record.category || ''}"`,
          formatDate(record.record_date)
        ];
        csv += row.join(',') + '\n';
      });
      
      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Relatório exportado",
        description: "O relatório financeiro foi exportado com sucesso."
      });
      
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao exportar",
        description: error.message || "Ocorreu um erro ao exportar os dados financeiros.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-white/20 hover:bg-white/5 hover:text-white">
          <Download className="w-4 h-4" />
          <span>Exportar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-lawyer-black/90 border border-white/10 backdrop-blur-lg text-white">
        <DialogHeader>
          <DialogTitle className="gradient-text">Exportar Dados Financeiros</DialogTitle>
          <DialogDescription className="text-gray-300">
            Exporte seus dados financeiros em formato CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="export-type" className="text-gray-200">Tipo de Exportação</Label>
            <Select
              value={exportType}
              onValueChange={(value: 'all' | 'period') => setExportType(value)}
            >
              <SelectTrigger className="bg-white/10 border-gray-700 text-white">
                <SelectValue placeholder="Selecione o tipo de exportação" />
              </SelectTrigger>
              <SelectContent className="bg-lawyer-black border-gray-700 text-white">
                <SelectItem value="all">Todos os registros</SelectItem>
                <SelectItem value="period">Por período</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {exportType === 'period' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-gray-200">Data Inicial</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-gray-200">Data Final</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-white/20 hover:bg-white/5 hover:text-white"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleExport}
            disabled={isLoading}
            className="bg-gradient-to-r from-lawyer-purple to-lawyer-blue"
          >
            {isLoading ? "Exportando..." : "Exportar CSV"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
