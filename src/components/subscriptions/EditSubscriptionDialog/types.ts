import { SUBSCRIPTION_LOGOS } from "./constants";

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  category: string;
  image_url?: string;
}

export interface EditSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription;
  onSubscriptionUpdated: () => void;
}

export interface LogoSelectorProps {
  selectedLogo: keyof typeof SUBSCRIPTION_LOGOS;
  onLogoChange: (logo: keyof typeof SUBSCRIPTION_LOGOS) => void;
}

export interface InputFieldsProps {
  name: string;
  amount: string;
  onNameChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

export interface SaveButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onCancel: () => void;
  onSave: () => void;
}
