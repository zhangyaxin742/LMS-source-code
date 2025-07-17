
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TranscriptTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-3">Video Transcript</h3>
        <div className="p-4 bg-secondary/30 rounded-md max-h-[300px] overflow-y-auto">
          <p className="text-sm">
            Welcome to this lesson on UI versus UX design. In this video, we'll cover the key differences between user interface design and user experience design, and how they work together to create effective digital products.
          </p>
          <p className="text-sm mt-2">
            User Interface, or UI design, focuses on the visual elements that users interact with. This includes buttons, icons, spacing, typography, color schemes, and overall visual style. A good UI designer ensures that every visual element feels cohesive and serves a clear purpose.
          </p>
          <p className="text-sm mt-2">
            On the other hand, User Experience, or UX design, is concerned with the overall feel of the experience. UX designers focus on understanding the user's journey, their needs, and pain points. They work to ensure the product is intuitive, accessible, and enjoyable to use.
          </p>
          {/* Further transcript content would go here in a real implementation */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptTab;
