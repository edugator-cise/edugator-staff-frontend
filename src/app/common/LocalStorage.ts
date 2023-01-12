import { AxiosError } from "axios";

/** Wrapper class for the window.localStorage that enables access to its methods */
export class LocalStorage {
  static jwtToken = "jwtToken";

  /** Returns the current value associated with the token,
   * or null if the token does not exist. */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.jwtToken);
    }
    return null;
  }

  /**
   * Sets the jwtToken to the token value, creating a new key/value pair if none existed for key previously.
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
   * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   */
  static setToken(token: string): void {
    localStorage.setItem(this.jwtToken, token);
  }

  /** Deletes the token if it exists safely */
  static removeToken(): void {
    localStorage.removeItem(this.jwtToken);
  }

  /**
   * Checks whether the error is a 401 Axios Error. If so, it removes the token.
   * @param e, treats it like an Axios error.
   * If it is an axios error with a 401 response status, returns true.
   * Otherwise, it returns false.
   */
  static checkUnauthorized(e: any): boolean {
    if ((e as AxiosError)?.response?.status === 401) {
      return true;
    }
    return false;
  }
}
