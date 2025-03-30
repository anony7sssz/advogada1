
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type FinancialRecord = {
  description: string;
  amount: number;
  record_type: 'receita' | 'despesa';
  category: string;
  record_date: string;
};

export function NewRecordDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [record, setRecord] = useState<FinancialRecord>({
    description: "",
    amount: 0,
    record_type: "receita",
    category: "",
    record_date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });

  const handleChange = (field: keyof FinancialRecord, value: string | number) => {
    setRecord(prev => ({
      ...prev,
      [field]: field === 'amount' && typeof value === 'string' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('financial_records')
        .insert([record]);

      if (error) throw error;

      toast({
        title: "Registro adicionado",
        description: "O registro financeiro foi adicionado com sucesso."
      });
      setOpen(false);
      // Reset form
      setRecord({
        description: "",
        amount: 0,
        record_type: "receita",
        category: "",
        record_date: new Date().toISOString().split('T')[0]
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar registro",
        description: error.message || "Ocorreu um erro ao adicionar o registro financeiro.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span>Novo Registro</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-lawyer-black/90 border border-white/10 backdrop-blur-lg text-white">
        <DialogHeader>
          <DialogTitle className="gradient-text">Novo Registro Financeiro</DialogTitle>
          <DialogDescription className="text-gray-300">
            Preencha os dados do novo registro financeiro.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200">Descrição</Label>
            <Input
              id="description"
              value={record.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descrição do registro"
              required
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-200">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={record.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="0.00"
              required
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="record_type" className="text-gray-200">Tipo</Label>
              <Select
                value={record.record_type}
                onValueChange={(value) => handleChange('record_type', value as 'receita' | 'despesa')}
              >
                <SelectTrigger className="bg-white/10 border-gray-700 text-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-lawyer-black border-gray-700 text-white">
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-200">Categoria</Label>
              <Input
                id="category"
                value={record.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Ex: Honorários, Escritório"
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="record_date" className="text-gray-200">Data</Label>
            <Input
              id="record_date"
              type="date"
              value={record.record_date}
              onChange={(e) => handleChange('record_date', e.target.value)}
              required
              className="bg-white/10 border-gray-700 text-white"
            />
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
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-lawyer-purple to-lawyer-blue"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
