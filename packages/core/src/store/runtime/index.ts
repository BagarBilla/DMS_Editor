// Runtime ports, budgets, cancellation, and per-operation snapshots (task 0.3).
export {
  type ResourceLimits,
  type ImageResourceLimits,
  HARD_CEILINGS,
  DEFAULT_LIMITS,
  IMAGE_RESOURCE_HARD_CEILINGS,
  DEFAULT_IMAGE_RESOURCE_LIMITS,
  resolveLimits,
  resolveImageResourceLimits,
} from './limits.js';
export { BoundedCounter, LimitExceededError } from './counter.js';
export { Budget, BudgetError, type Reservation } from './budget.js';
export {
  CancellationController,
  CancellationError,
  type CancellationToken,
  type CancellationPhase,
} from './cancellation.js';
export {
  PortRegistry,
  PortResolutionError,
  DeterministicClock,
  SequentialIdentity,
  type ClockPort,
  type IdentityPort,
  type SchedulingPort,
  type AuditPort,
  type AuthorizationPort,
  type ExternalResourceConsentPort,
  type CancellationPort,
  type PersistencePort,
  type TransportPort,
  type FontPort,
  type ShapingPort,
  type ImagePort,
  type ResourceAccountingPort,
} from './ports.js';
export {
  beginOperation,
  endOperation,
  type OperationInit,
  type OperationContext,
} from './operation.js';
export {
  type LimitUnit,
  type EnforcementPhase,
  type LimitSpec,
  LIMIT_SPECS,
  LIMIT_KEYS,
  makeLimitCounter,
  DeterministicMemoryMeter,
  assertLimitInvariants,
} from './resource-meter.js';
