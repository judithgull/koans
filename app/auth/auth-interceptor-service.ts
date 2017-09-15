import * as angular from "angular";
import {TokenStorage} from "./token-storage-service";

export class AuthInterceptor implements ng.IHttpInterceptor {

    public static $inject = ["TokenStorage"];

    constructor(private tokenStorage:TokenStorage) {
    }

    request = (config:ng.IRequestConfig):ng.IRequestConfig => {
      const token = this.tokenStorage.get();
      if (token && config.headers) {
        config.headers["authorization"] = "Bearer " + token;
      }
      return config;
    };

  }
