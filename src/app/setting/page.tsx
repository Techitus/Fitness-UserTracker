import { CompanyInfo } from "@/components/setting/company-info";
import { UpdateCredentials } from "@/components/setting/update-credential";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <CompanyInfo />
        </div>
        {/* Adjust Separator and responsiveness */}
        <div className="hidden lg:block">
          <Separator orientation="vertical" />
        </div>
        <div className="w-full lg:w-1/2">
          <UpdateCredentials />
        </div>
      </div>
    </div>
  );
}
