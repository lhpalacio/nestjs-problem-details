import { ProblemDetailsExceptionInterface } from './problem-details-exception-interface';

export class ProblemDetailsException
  extends Error
  implements ProblemDetailsExceptionInterface {
  public status: number;

  public type: string;

  public title: string;

  public detail: string;

  public additionalData: Record<string, string | number>;

  public getStatus(): number {
    return this.status;
  }

  public getType(): string {
    return this.type;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDetail(): string {
    return this.detail;
  }

  public getAdditionalData(): Record<string, string | number> {
    return this.additionalData;
  }

  public toArray(): Record<
    string,
    string | number | Record<string, string | number>
  > {
    const problem: any = {
      status: this.status,
      type: this.type,
      title: this.title,
      detail: this.detail,
    };

    if (this.additionalData) {
      problem.additional = this.additionalData;
    }

    return problem;
  }
}
