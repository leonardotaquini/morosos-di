"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Debtor } from "@/lib/debtors"
import { differenceInDays, format, formatDistanceToNow, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { CakeSlice, CalendarClock, Plus, Timer as TimerIcon, Users } from "lucide-react"

type Priority = {
  label: string
  variant: "default" | "secondary" | "destructive" | "outline"
}

type EnrichedDebtor = Debtor & {
  owedSinceDate: Date
  owedDays: number
  priority: Priority
}

type DebtorFormState = {
  name: string
  role: string
  team: string
  owedSince: string
  lastReminder: string
  favoriteCake: string
  photo: string
  notes: string
}

const emptyFormState: DebtorFormState = {
  name: "",
  role: "",
  team: "",
  owedSince: "",
  lastReminder: "",
  favoriteCake: "",
  photo: "",
  notes: "",
}

function enrichDebtor(debtor: Debtor, today: Date): EnrichedDebtor {
  const owedSinceDate = parseISO(debtor.owedSince)
  const owedDays = Math.max(differenceInDays(today, owedSinceDate), 0)

  return {
    ...debtor,
    owedSinceDate,
    owedDays,
    priority: getPriority(owedDays),
  }
}

function getPriority(days: number): Priority {
  if (days >= 600) {
    return { label: "Crítico", variant: "destructive" }
  }

  if (days >= 300) {
    return { label: "Urgente", variant: "default" }
  }

  if (days >= 120) {
    return { label: "Seguimiento", variant: "secondary" }
  }

  return { label: "Reciente", variant: "outline" }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
export default function Home() {
  const [debtors, setDebtors] = useState<Debtor[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formState, setFormState] = useState<DebtorFormState>(emptyFormState)

  const today = new Date()

  const enrichedDebtors = debtors
    .map((debtor) => enrichDebtor(debtor, today))
    .sort((a, b) => b.owedDays - a.owedDays)

  const totalDays = enrichedDebtors.reduce((sum, debtor) => sum + debtor.owedDays, 0)
  const averageDays = enrichedDebtors.length
    ? Math.round(totalDays / enrichedDebtors.length)
    : 0
  const topDebtor = enrichedDebtors[0]

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormState(emptyFormState)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requiredFields: Array<keyof DebtorFormState> = [
      "name",
      "role",
      "team",
      "owedSince",
      "lastReminder",
      "favoriteCake",
      "notes",
    ]

    const hasMissingRequired = requiredFields.some((field) => !formState[field].trim())
    if (hasMissingRequired) {
      return
    }

    const newDebtor: Debtor = {
      id: crypto.randomUUID(),
      name: formState.name.trim(),
      role: formState.role.trim(),
      team: formState.team.trim(),
      owedSince: formState.owedSince,
      lastReminder: formState.lastReminder,
      favoriteCake: formState.favoriteCake.trim(),
      photo: formState.photo.trim(),
      notes: formState.notes.trim(),
    }

    setDebtors((prev) => [...prev, newDebtor])
    resetForm()
    setIsDialogOpen(false)
  }
  return (
<div className="bg-background min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-4">
          <Badge variant="outline" className="w-fit uppercase tracking-wide">
            Dirección de Ingeniería
          </Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Tablero de morosos de torta
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Registro oficial de quién debe la celebración del último cumpleaños dentro
              de la dirección. Cada tarjeta resume el compromiso, los días en deuda y el
              seguimiento más reciente.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="self-start" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 size-4" /> Registrar moroso
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar nuevo moroso</DialogTitle>
                <DialogDescription>
                  Completa la información del colaborador que adeuda la torta.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ej. Ana López"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-1 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="role">Cargo</Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="Ej. Staff Backend Engineer"
                        value={formState.role}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="team">Equipo</Label>
                      <Input
                        id="team"
                        name="team"
                        placeholder="Ej. Plataforma"
                        value={formState.team}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="owedSince">Debe torta desde</Label>
                      <Input
                        id="owedSince"
                        name="owedSince"
                        type="date"
                        value={formState.owedSince}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="lastReminder">Último recordatorio</Label>
                      <Input
                        id="lastReminder"
                        name="lastReminder"
                        type="date"
                        value={formState.lastReminder}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="favoriteCake">Torta prometida</Label>
                    <Input
                      id="favoriteCake"
                      name="favoriteCake"
                      placeholder="Ej. Red velvet con frutos rojos"
                      value={formState.favoriteCake}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="photo">Foto (URL)</Label>
                    <Input
                      id="photo"
                      name="photo"
                      placeholder="https://..."
                      value={formState.photo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="notes">Promesa oficial</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Describe el compromiso de torta"
                      value={formState.notes}
                      onChange={handleInputChange}
                      required
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar moroso</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de morosos
              </CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{enrichedDebtors.length}</p>
              <p className="text-muted-foreground text-sm">
                Dirección de Ingeniería 2024-2025
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Promedio de días en deuda
              </CardTitle>
              <TimerIcon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{averageDays} días</p>
              <p className="text-muted-foreground text-sm">
                Tiempo desde el cumpleaños pendiente
              </p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mayor deuda activa
              </CardTitle>
              <CalendarClock className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">
                {topDebtor ? `${topDebtor.owedDays} días` : "Sin adeudos"}
              </p>
              <p className="text-muted-foreground text-sm">
                {topDebtor ? topDebtor.name : "Todos celebraron a tiempo"}
              </p>
            </CardContent>
          </Card>
          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tortas comprometidas
              </CardTitle>
              <CakeSlice className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{debtors.length}</p>
              <p className="text-muted-foreground text-sm">
                Sabores pendientes de entrega
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {enrichedDebtors.length === 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sin morosos registrados</CardTitle>
                <CardDescription>
                  Agrega el primer moroso para comenzar a rastrear los compromisos de torta pendientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 size-4" /> Registrar moroso
                </Button>
              </CardContent>
            </Card>
          )}
          {enrichedDebtors.map((debtor) => {
            const owedDistance = formatDistanceToNow(debtor.owedSinceDate, {
              locale: es,
              addSuffix: true,
            })
            const lastReminderDate = parseISO(debtor.lastReminder)

            return (
              <Card key={debtor.id} className="h-full">
                <CardHeader className="border-b pb-6">
                  <CardAction>
                    <Badge variant={debtor.priority.variant}>{debtor.priority.label}</Badge>
                  </CardAction>
                  <div className="flex items-start gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src={debtor.photo} alt={debtor.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {getInitials(debtor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-semibold">
                        {debtor.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {debtor.role} · {debtor.team}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarClock className="size-4" />
                        Desde
                      </div>
                      <span className="font-medium">
                        {format(debtor.owedSinceDate, "d 'de' MMMM yyyy", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TimerIcon className="size-4" />
                        Tiempo sin torta
                      </div>
                      <span className="font-medium capitalize">{owedDistance}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="size-4" />
                        Último recordatorio
                      </div>
                      <span className="font-medium">
                        {format(lastReminderDate, "d 'de' MMMM yyyy", { locale: es })}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-muted/30 px-4 py-3 text-sm">
                    <p className="font-medium text-muted-foreground">Promesa oficial</p>
                    <p className="mt-1 leading-relaxed">{debtor.notes}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                      <CakeSlice className="size-4 text-muted-foreground" />
                      {debtor.favoriteCake}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </div>
    </div>
  )
}