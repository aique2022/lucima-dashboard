import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Folder, GitPullRequest, Database } from "lucide-react";

interface ProjectBannerProps {
  selectedCollection: string;
  collections: string[];
  handleCollectionChange: (value: string) => void;
  error?: string | null;
  totalCollections: number;
  totalData: number;
}

export function ProjectBanner({
  selectedCollection,
  collections,
  handleCollectionChange,
  error,
  totalCollections,
  totalData,
}: ProjectBannerProps) {
  const projectStats = [
    {
      label: "Total Projects",
      value: totalCollections,
      icon: Database,
      color: "text-blue-500",
    },
    {
      label: "Total Transaction",
      value: totalData,
      icon: GitPullRequest,
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Card className="relative overflow-hidden border bg-card text-card-foreground lg:flex-1">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20  to-teal-500/10" />

        <CardHeader className="relative pb-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">
                Select the Project
              </h3>
              <p className="text-sm text-muted-foreground">
                Access all your projects and manage your transacstion seamlessly
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex items-center gap-6 w-full">
            <Select
              value={selectedCollection}
              onValueChange={handleCollectionChange}
            >
              <SelectTrigger
                id="collection-select"
                className="w-[200px] bg-background/50 backdrop-blur-sm"
              >
                <SelectValue
                  placeholder="Select a collection"
                  className="text-muted-foreground"
                >
                  {selectedCollection || "Select a collection"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {collections.length > 0 ? (
                  collections.map((collection) => (
                    <SelectItem
                      key={collection}
                      value={collection}
                      className="cursor-pointer"
                    >
                      {collection}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    {error
                      ? "Error loading collections"
                      : "No collections available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Optional: Add a subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  );
}
