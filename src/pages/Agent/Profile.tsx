import ChangePasswordForm from "@/components/modules/profile/ChangePasswordForm";
import PersonalInfoForm from "@/components/modules/profile/PersonalInfoForm";
export default function Profile() {
  return (
    <div className="space-y-10 max-w-xl mx-auto">
      <PersonalInfoForm />
      <ChangePasswordForm />
    </div>
  );
}