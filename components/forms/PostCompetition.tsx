"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

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
import { createCompetition } from "@/lib/actions/competition.actions";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  userId: string;
}

function PostCompetition({ userId }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CompetitionValidation>>({
    resolver: zodResolver(CompetitionValidation),
    defaultValues: {
      title: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof CompetitionValidation>) => {
    await createCompetition({
      title: values.title,
      owner: userId,
      details: values.details,
      regulations: values.regulations,
      regulationsLink: values.regulationsLink,
      startDate: values.startDate,
      type: values.type,
      path: pathname,
    });

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
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Title
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='details'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Details
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='regulations'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                regulations
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='regulationsLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Link to regulations
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                start date
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
              <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={
            "w-[280px] justify-start text-left font-normal"
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                type of competition
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Swiss">Swiss</SelectItem>
                    <SelectItem value="League">League</SelectItem>
                    <SelectItem value="Bracket">Bracket</SelectItem>
                    <SelectItem value="Basket Bracket">Basket Bracket</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>
          Post Competition
        </Button>
      </form>
    </Form>
  );
}

export default PostCompetition;