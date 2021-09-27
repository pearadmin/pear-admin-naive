import ky from 'ky'
import { defaultFetchConfig } from '@/api/http/defaultFetchConfig'
import { UserFetchConfig, DefaultCreateFetchOptions } from '@/api/http/type'

export class FetchRequest {
  private readonly kyInstance: typeof ky
  constructor(options = defaultFetchConfig) {
    this.kyInstance = ky.create(options)
  }

  private transformUrl(url: string): string {
    if (url.startsWith('/')) {
      return url.substr(1)
    }
    return url
  }

  /**
   *
   * @param url
   * @param options
   * @param userFetchConfig
   */
  post<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.post(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.post(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   * @param userFetchConfig
   */
  get<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.get(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.get(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   * @param userFetchConfig
   */
  put<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.put(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.put(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   * @param userFetchConfig
   */
  delete<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.delete(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.delete(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   * @param userFetchConfig
   */
  patch<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.patch(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.patch(fetchUrl, options).json<T>()
    }
  }

  head<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance.head(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.head(fetchUrl, options).json<T>()
    }
  }

  /**
   * @param url
   * @param options
   * @param userFetchConfig
   */
  request<T = any>(
    url: string,
    options?: DefaultCreateFetchOptions,
    userFetchConfig?: UserFetchConfig
  ): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (userFetchConfig && userFetchConfig.transform) {
      const { transform } = userFetchConfig
      return this.kyInstance(fetchUrl, options)[transform]() as unknown as Promise<T>
    } else {
      return this.kyInstance(fetchUrl, options).json<T>()
    }
  }
}

export default new FetchRequest()
