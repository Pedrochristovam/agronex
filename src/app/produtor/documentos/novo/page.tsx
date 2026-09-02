"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CloudUpload,
  FileImage,
  FileText,
  Info,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

const checklist = [
  "Formatos aceitos: PDF, JPG ou PNG",
  "Tamanho máximo: 10MB por arquivo",
  "Visibilidade total (sem cortes ou reflexos)",
];

const arquivosIniciais = [
  {
    id: "1",
    nome: "CAR_Fazenda_Boa_Vista.pdf",
    tipo: "PDF",
    tamanho: "2,4 MB",
    progresso: 100,
    concluido: true,
  },
  {
    id: "2",
    nome: "Comprovante_Endereco_2023.jpg",
    tipo: "JPG",
    tamanho: "1,1 MB",
    progresso: 45,
    concluido: false,
  },
];

export default function NovoDocumentoPage() {
  const [arquivos, setArquivos] = useState(arquivosIniciais);

  const removeArquivo = (id: string) => {
    setArquivos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <Link
        href="/produtor/documentos"
        className="mb-4 inline-flex items-center gap-1 text-sm text-agronex-green hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Documentos
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-gray-900">Enviar Novo Documento</h1>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Tipo de Documento"
                required
                defaultValue=""
                options={[
                  { value: "", label: "Selecione o tipo" },
                  { value: "ambiental", label: "Ambiental (CAR)" },
                  { value: "transito", label: "Trânsito (GTA)" },
                  { value: "pessoal", label: "Pessoal" },
                  { value: "financeiro", label: "Financeiro" },
                  { value: "operacional", label: "Operacional" },
                  { value: "certificacao", label: "Certificação" },
                ]}
              />
              <Input
                label="Número do Documento (Opcional)"
                placeholder="Ex: 123.456.789-00"
              />
              <Input label="Data de Emissão" type="date" required />
              <Input label="Data de Validade (se houver)" type="date" />
            </div>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-agronex-border bg-white p-10 transition-colors hover:border-agronex-green hover:bg-green-50/30">
            <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CloudUpload className="h-7 w-7 text-agronex-green" />
            </div>
            <p className="text-center text-sm font-medium text-gray-700">
              Arraste e solte o arquivo aqui ou clique para selecionar do seu
              dispositivo
            </p>
            <span className="mt-4 rounded-lg bg-agronex-green px-4 py-2 text-sm font-medium text-white">
              Procurar Arquivos
            </span>
          </label>

          {arquivos.length > 0 && (
            <div className="rounded-xl border border-agronex-border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold">Arquivos Selecionados</h2>
              <div className="space-y-3">
                {arquivos.map((arquivo) => (
                  <div
                    key={arquivo.id}
                    className="flex items-center gap-4 rounded-lg border border-agronex-border p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                      {arquivo.tipo === "PDF" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : (
                        <FileImage className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{arquivo.nome}</p>
                      <p className="text-xs text-agronex-muted">{arquivo.tamanho}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-agronex-green transition-all"
                          style={{ width: `${arquivo.progresso}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-agronex-muted">
                      {arquivo.progresso}%
                    </span>
                    <button
                      type="button"
                      onClick={() => removeArquivo(arquivo.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      {arquivo.concluido ? (
                        <Trash2 className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" href="/produtor/documentos">
              Cancelar
            </Button>
            <Button href="/produtor/documentos" className="gap-2">
              Confirmar Envio
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-agronex-border bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Checklist de Requisitos</h3>
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-agronex-green" />
                  {item}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-agronex-muted">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Certifique-se de que o documento está dentro do prazo de validade
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-relaxed text-amber-900">
              A documentação correta agiliza o processo de análise e liberação de
              lotes comerciais.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
