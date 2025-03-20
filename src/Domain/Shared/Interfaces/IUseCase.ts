export interface IUseCase<Response, RequestArgs extends any[] = [void]> {
  execute(...args: RequestArgs): Promise<Response>;
}
