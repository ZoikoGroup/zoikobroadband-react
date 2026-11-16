import type { ComponentType } from "react";
import type { StepId } from "../types";
import AvailabilityStep from "./AvailabilityStep";
import ConfirmationStep from "./ConfirmationStep";
import ConnectedStep from "./ConnectedStep";
import DetailsStep from "./DetailsStep";
import MovingHomeStep from "./MovingHomeStep";
import MyZoikoStep from "./MyZoikoStep";
import PersonaliseStep from "./PersonaliseStep";
import PlansStep from "./PlansStep";
import SwitchingStep from "./SwitchingStep";
import TrackingStep from "./TrackingStep";

export const STEP_COMPONENTS: Record<StepId, ComponentType> = {
  availability: AvailabilityStep,
  plans: PlansStep,
  personalise: PersonaliseStep,
  switching: SwitchingStep,
  details: DetailsStep,
  confirmation: ConfirmationStep,
  tracking: TrackingStep,
  connected: ConnectedStep,
  myzoiko: MyZoikoStep,
  moving: MovingHomeStep,
};
