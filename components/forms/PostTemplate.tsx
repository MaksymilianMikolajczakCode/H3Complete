"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { HeroNames } from "@/constants/heroes";
import { SpellNames } from "@/constants/spells";
import { ArtefactNames } from "@/constants/artefacts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";


import { TemplateValidation } from "@/lib/validations/template";
import { createTemplate } from "@/lib/actions/template.actions";
import { editTemplate } from "@/lib/actions/template.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import Tiptap from "../Tiptap";
import React from "react";

interface Props {
  type: string;
  template?: any;
  id?: string;
}

function PostTemplate({type, template, id }: Props) {

  const [state, setstate] = useState({
    image: template?.image ||'',
    title: template?.title ||'Tytuł Szablonu',
    download: template?.download ||'',
    description: template?.description ||'Opis Szablonu',
    specification: template?.specification ||'Specyfikacja Szablonu',
    settings: template?.settings ||'Polecane Ustawienia Szablonu',
    rules: template?.rules ||'Zasady Szablonu',
    trade: template?.trade ||'Licytacja',
    specificationLink: template?.specificationlink || '',
    changelog: template?.changelog || '',
    changelogLink: template?.changeloglink || '',
    category: template?.category || '',
    bannedHeroes: template?.banned_heroes || '',
    bannedSpells: template?.banned_spells || '',
    bannedArtefacts: template?.banned_artefacts || '',
})

  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };


  const form = useForm<z.infer<typeof TemplateValidation>>({
    resolver: zodResolver(TemplateValidation),
    defaultValues: {
        title: state.title,
        download: state.download,
        description: state.description,
        specification: state.specification,
        // creator: "",
        settings: state.settings,
        rules: state.rules,
        image: state.image,
        trade: state.trade,
        specificationLink: state.specificationLink,
        changelog: state.changelog,
        changelogLink: state.changelogLink,
        category: state.category,
        bannedHeroes: state.bannedHeroes,
        bannedSpells: state.bannedSpells,
        bannedArtefacts: state.bannedArtefacts,
    },
  });




  const [filteredHeroes, setFilteredHeroes] = useState(HeroNames);

  const handleSelectHero = (hero: string) => {
    const currentHeroes = form.getValues("bannedHeroes") || [];
    if (!currentHeroes.includes(hero)) {
      form.setValue("bannedHeroes", [...currentHeroes, hero]);
    }
  };
  
  const handleRemoveHero = (heroToRemove: string) => {
    const currentHeroes = form.getValues("bannedHeroes") || [];
    form.setValue("bannedHeroes", currentHeroes.filter((hero) => hero !== heroToRemove));
  };
  
  const [filteredSpells, setFilteredSpells] = useState(SpellNames);

  const handleSelectSpell = (spell: string) => {
    const currentSpells = form.getValues("bannedSpells") || [];
    if (!currentSpells.includes(spell)) {
      form.setValue("bannedSpells", [...currentSpells, spell]);
    }
  };
  
  const handleRemoveSpell = (spellToRemove: string) => {
    const currentSpells = form.getValues("bannedSpells") || [];
    form.setValue(
      "bannedSpells",
      currentSpells.filter((spell) => spell !== spellToRemove)
    );
  };
  
  const [filteredArtefacts, setFilteredArtefacts] = useState(ArtefactNames);

  const handleSelectArtefact = (artefact: string) => {
    const currentArtefacts = form.getValues("bannedArtefacts") || [];
    if (!currentArtefacts.includes(artefact)) {
      form.setValue("bannedArtefacts", [...currentArtefacts, artefact]);
    }
  };
  
  const handleRemoveArtefact = (artefactToRemove: string) => {
    const currentArtefacts = form.getValues("bannedArtefacts") || [];
    form.setValue(
      "bannedArtefacts",
      currentArtefacts.filter((artefact) => artefact !== artefactToRemove)
    );
  };


  const onSubmit = async (values: z.infer<typeof TemplateValidation>) => {
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.image = imgRes[0].fileUrl;
      }
    }
    if(type === "create") {
      await createTemplate({
        title: values.title,
        download: values.download,
        description: values.description,
        specification: values.specification,
        // creator: values.creator,
        settings: values.settings,
        rules: values.rules,
        image: values.image,
        trade: values.trade,
        specificationLink: values.specificationLink,
        changelog: values.changelog,
        changelogLink: values.changelogLink,
        category: values.category,
        bannedHeroes: values.bannedHeroes,
        bannedSpells: values.bannedSpells,
        bannedArtefacts: values.bannedArtefacts,
      path: pathname
    });
   router.push("/templates");
    }
    if(type === "edit") {
      await editTemplate({
        id:id,
        title: values.title,
        download: values.download,
        description: values.description,
        specification: values.specification,
        // creator: values.creator,
        settings: values.settings,
        rules: values.rules,
        image: values.image,
        trade: values.trade,
        specificationLink: values.specificationLink,
        changelog: values.changelog,
        changelogLink: values.changelogLink,
        category: values.category,
        bannedHeroes: values.bannedHeroes,
        bannedSpells: values.bannedSpells,
        bannedArtefacts: values.bannedArtefacts,
      path: pathname
    });
    router.push(`/templates/${id}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 mx-[calc(10vw)] w-[calc(79vw)] flex flex-col justify-start gap-10 mb-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
                <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              {/* <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel> */}
              <FormLabel className='text-base-semibold text-light-2'>
                    Wykres
                </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200 text-black'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add profile photo'
                  className=''
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Tytuł
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.title}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Opis
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Textarea {...field} placeholder={state.description}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem className='flex w-full flex-col gap-3'>
      <FormLabel className='text-base-semibold text-light-2'>Kategoria</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl className='no-focus border border-dark-4 text-light-1 text-black'>
          <SelectTrigger>
            <SelectValue placeholder={field.value || "Wybierz kategorię"} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Klasyczne">Klasyczny</SelectItem>
          <SelectItem value="One-Hero">One-Hero</SelectItem>
          <SelectItem value="Egzotyka">Egzotyka</SelectItem>
          <SelectItem value="Jebusy">Jebus</SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>








<FormField
  control={form.control}
  name="bannedHeroes"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Select BannedHeroes (Optional)</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className="w-[200px] justify-between"
              role="combobox"
            >
              {field.value && field.value.length > 0
                ? `${field.value.length} hero${field.value.length > 1 ? "es" : ""} selected`
                : "Select heroes"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search heroes..."
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                const filteredHeroes = HeroNames.filter((hero) =>
                  hero.toLowerCase().includes(query)
                );
                // Directly handle filtering heroes in the list
                setFilteredHeroes(filteredHeroes);  // update this to handle filtered list directly
              }}
            />
            <CommandList>
              <CommandEmpty>No heroes found.</CommandEmpty>
              <CommandGroup>
                {/* Display filtered heroes */}
                {filteredHeroes.length > 0 ? (
                  filteredHeroes.map((hero) => (
                    <CommandItem
                      key={hero}
                      value={hero}
                      onSelect={() => handleSelectHero(hero)}
                    >
                      {hero.replace("Hero_", "").replace(".png", "")}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>No matching heroes</CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display selected heroes */}
      {field.value && field.value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.value.map((hero: string) => (
            <span
              key={hero}
              className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
            >
              {hero.replace("Hero_", "").replace(".png", "")}
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveHero(hero)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="bannedArtefacts"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Select Banned Artefacts (Optional)</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className="w-[200px] justify-between"
              role="combobox"
            >
              {field.value && field.value.length > 0
                ? `${field.value.length} artefact${field.value.length > 1 ? "s" : ""} selected`
                : "Select artefacts"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search artefacts..."
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                const filtered = ArtefactNames.filter((artefact) =>
                  artefact.toLowerCase().includes(query)
                );
                setFilteredArtefacts(filtered);
              }}
            />
            <CommandList>
              <CommandEmpty>No artefacts found.</CommandEmpty>
              <CommandGroup>
                {filteredArtefacts.length > 0 ? (
                  filteredArtefacts.map((artefact) => (
                    <CommandItem
                      key={artefact}
                      value={artefact}
                      onSelect={() => handleSelectArtefact(artefact)}
                    >
                      {artefact.replace("Artifact_", "").replace(".gif", "")}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>No matching artefacts</CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display selected artefacts */}
      {field.value && field.value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.value.map((artefact: string) => (
            <span
              key={artefact}
              className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
            >
              {artefact.replace("Artifact_", "").replace(".gif", "")}
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveArtefact(artefact)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  )}
/>






<FormField
  control={form.control}
  name="bannedSpells"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Select Banned Spells (Optional)</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className="w-[200px] justify-between"
              role="combobox"
            >
              {field.value && field.value.length > 0
                ? `${field.value.length} spell${field.value.length > 1 ? "s" : ""} selected`
                : "Select spells"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search spells..."
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                const filteredSpells = SpellNames.filter((spell) =>
                  spell.toLowerCase().includes(query)
                );
                // Directly handle filtering spells in the list
                setFilteredSpells(filteredSpells);  // update this to handle filtered list directly
              }}
            />
            <CommandList>
              <CommandEmpty>No spells found.</CommandEmpty>
              <CommandGroup>
                {/* Display filtered spells */}
                {filteredSpells.length > 0 ? (
                  filteredSpells.map((spell) => (
                    <CommandItem
                      key={spell}
                      value={spell}
                      onSelect={() => handleSelectSpell(spell)}
                    >
                      {spell.replace("Spell_", "").replace(".png", "")}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>No matching spells</CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display selected spells */}
      {field.value && field.value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.value.map((spell: string) => (
            <span
              key={spell}
              className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
            >
              {spell.replace("Spell_", "").replace(".png", "")}
              <button
                className="ml-2 text-red-500"
                onClick={() => handleRemoveSpell(spell)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  )}
/>

















        <FormField
          control={form.control}
          name='settings'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Ustawienia
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.settings} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specification'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Specyfikacja
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.specification} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specificationLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Link do pelnej specyfikacji (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.specificationLink}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='changelog'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Changelog (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.changelog} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='changelogLink'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Link do changeloga (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.changelogLink}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rules'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Zasady
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.rules} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='download'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Link Do Pobrania (opcjonalne)
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Input {...field} placeholder={state.download}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='trade'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
              Licytacja
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 text-black'>
                <Tiptap content={state.trade} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type='submit' className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'>
        {type === "create" ? ( <div>Dodaj Szablon</div>) : ( <div>Edytuj Szablon</div>)}

    </button>
      </form>
    </Form>
  );
}

export default PostTemplate;