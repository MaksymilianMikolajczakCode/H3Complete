"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CompetitionValidation } from "@/lib/validations/competition";
import { createCompetition, updateMatch } from "@/lib/actions/competition.actions";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MatchValidation } from "@/lib/validations/match";

interface Props {
  matchData: {
    matchId:string;
    player1id: string;
    player1username: string;
    player2id: string;
    player2username: string;
    matchNumber: number;
    competition: string;
    NoR1Games: number;
    competitionOwner: string;
  }
}

function PostCompetition({ matchData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof MatchValidation>>({
    resolver: zodResolver(MatchValidation),
    defaultValues: {
      winner: "",
      loser: "",
      winnerTrade: 0,
      winnerCastle: "Castle",
      loserTrade: 0,
      loserCastle: "Castle",
      matchNumber: matchData.matchNumber,
      competition: matchData.competition,
      NoR1Games: matchData.NoR1Games,
      matchId: matchData.matchId,
    },
  });

  const onSubmit = async (values: z.infer<typeof MatchValidation>) => {
    await updateMatch({
      winner: values.winner,
      loser: values.loser,
      winnerTrade: values.winnerTrade,
      winnerCastle: values.winnerCastle,
      loserTrade: values.loserTrade,
      loserCastle: values.loserCastle,
      matchNumber: values.matchNumber,
      competition: values.competition,
      NoR1Games: values.NoR1Games,
      matchId: values.matchId,
      path: pathname
    });
    // console.log(title, owner, details, regulations, regulationsLink, startDate, type)
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='winner'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                won
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]" >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent >
                    <SelectItem value={matchData.player1id} >{matchData.player1username}</SelectItem>
                    <SelectItem value={matchData.player2id} >{matchData.player2username}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='winnerTrade'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                winner trade
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input {...field} type="number"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='loser'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                defeated
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]" >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent >
                    <SelectItem value={matchData.player1id} >{matchData.player1username}</SelectItem>
                    <SelectItem value={matchData.player2id} >{matchData.player2username}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='loserTrade'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                loser trade
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input {...field} type="number"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='winnerCastle'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                winner castle
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]" >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Castle" >Castle</SelectItem>
                    <SelectItem value="Conflux">Conflux</SelectItem>
                    <SelectItem value="Cove">Cove</SelectItem>
                    <SelectItem value="Dungeon" >Dungeon</SelectItem>
                    <SelectItem value="Fortress" >Fortress</SelectItem>
                    <SelectItem value="Inferno">Inferno</SelectItem>
                    <SelectItem value="Necropolis" >Necropolis</SelectItem>
                    <SelectItem value="Rampart" >Rampart</SelectItem>
                    <SelectItem value="Stronghold" >Stronghold</SelectItem>
                    <SelectItem value="Tower" >Tower</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name='loserCastle'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                loser castle
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]" >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Castle" >Castle</SelectItem>
                    <SelectItem value="Conflux">Conflux</SelectItem>
                    <SelectItem value="Cove">Cove</SelectItem>
                    <SelectItem value="Dungeon" >Dungeon</SelectItem>
                    <SelectItem value="Fortress" >Fortress</SelectItem>
                    <SelectItem value="Inferno">Inferno</SelectItem>
                    <SelectItem value="Necropolis" >Necropolis</SelectItem>
                    <SelectItem value="Rampart" >Rampart</SelectItem>
                    <SelectItem value="Stronghold" >Stronghold</SelectItem>
                    <SelectItem value="Tower" >Tower</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          add game
        </Button>
      </form>
    </Form>
  );
}

export default PostCompetition;