import ky from 'ky'
import { fetchConfig } from '@/api/http/fetchConfig'
import { InstanceFetchConfig } from '@/api/http/type'

export class Fetch {
  private readonly kyInstance: typeof ky
  constructor(options = fetchConfig) {
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
   */
  post<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.post(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.post(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   */
  get<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.get(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.get(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   */
  put<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.put(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.put(fetchUrl, options).json<T>()
    }
  }

  /**
   *
   * @param url
   * @param options
   */
  delete<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.delete(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.delete(fetchUrl, options).json<T>()
    }
  }

  /**
   * @param url
   * @param options
   */
  patch<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.patch(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.patch(fetchUrl, options).json<T>()
    }
  }

  head<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance.head(fetchUrl, options)[transform]() as Promise<T>
    } else {
      return this.kyInstance.head(fetchUrl, options).json<T>()
    }
  }

  /**
   * @param url
   * @param options
   */
  request<T = any>(url: string, options?: InstanceFetchConfig): Promise<T> {
    const fetchUrl = this.transformUrl(url)
    if (options && options.transform) {
      const { transform } = options
      return this.kyInstance(fetchUrl, options)[transform]() as unknown as Promise<T>
    } else {
      return this.kyInstance(fetchUrl, options).json<T>()
    }
  }
}

export default new Fetch()
