import { ActivationForm } from "@/components/live-experience/ActivationForm";

const Index = () => {
  return <ActivationForm onUnlock={() => window.location.href = '/live?unlocked=true'} />;
};

export default Index;