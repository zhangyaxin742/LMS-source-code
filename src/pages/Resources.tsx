
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourcesGrid from "@/components/resources/ResourcesGrid";
import ResourcesSearchFilter from "@/components/resources/ResourcesSearchFilter";
import { ResourceCategory } from "@/components/resources/types";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Resources Library</h1>
        <p className="text-muted-foreground">
          Browse, search and access all educational materials on the platform
        </p>
      </div>

      <ResourcesSearchFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 max-w-lg">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="classroom">Classroom</TabsTrigger>
          <TabsTrigger value="prerecorded">Prerecorded</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ResourcesGrid 
            type="all" 
            searchTerm={searchTerm}
            category={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="classroom">
          <ResourcesGrid 
            type="classroom" 
            searchTerm={searchTerm}
            category={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="prerecorded">
          <ResourcesGrid 
            type="prerecorded" 
            searchTerm={searchTerm}
            category={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="other">
          <ResourcesGrid 
            type="other" 
            searchTerm={searchTerm}
            category={selectedCategory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
