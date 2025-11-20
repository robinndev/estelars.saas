export interface CreateFormProps {
  themes: { id: string; label: string; bg: string; text: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  coupleName: string;
  setCoupleName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
  color: string;
  setColor: (color: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  startHour: string;
  setStartHour: (hour: string) => void;
  handleImage: (files: File[]) => void;
  musicLink: string;
  setMusicLink: (link: string) => void;
  selectedPlan: "normal" | "premium";
  setSelectedPlan: (plan: "normal" | "premium") => void;
  image: File[] | null;
}
