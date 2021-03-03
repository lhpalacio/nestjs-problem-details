/**
 * Defines an exception type for generating Problem Details.
 */
export interface ProblemDetailsExceptionInterface {
  getStatus(): number;

  getType(): string;

  getTitle(): string;

  getDetail(): string;

  getAdditionalData(): Record<string, string | number>;

  toArray(): Record<string, string | number | Record<string, string | number>>;
}
