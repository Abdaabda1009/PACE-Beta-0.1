import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { SaveButtonProps } from "./types";

export const SaveButton = ({
  isLoading,
  disabled,
  onCancel,
  onSave,
}: SaveButtonProps) => {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel} disabled={isLoading}>
        Cancel
      </Button>
      <Button onClick={onSave} disabled={disabled || isLoading}>
        Save Changes
      </Button>
    </DialogFooter>
  );
};
