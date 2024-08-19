import type React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InstallationProps {
  cli?: React.ReactNode;
  manual?: React.ReactNode;
}

export function Installation({ cli, manual }: InstallationProps) {
  return (
    <Tabs defaultValue="cli">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">{cli}</TabsContent>
      <TabsContent value="manual">{manual}</TabsContent>
    </Tabs>
  );
}
