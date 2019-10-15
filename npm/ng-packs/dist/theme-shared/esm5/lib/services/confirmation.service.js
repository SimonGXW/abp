/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from 'tslib';
import { Injectable } from '@angular/core';
import { AbstractToaster } from '../abstracts/toaster';
import { MessageService } from 'primeng/components/common/messageservice';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime, filter } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from 'primeng/components/common/messageservice';
var ConfirmationService = /** @class */ (function(_super) {
  tslib_1.__extends(ConfirmationService, _super);
  function ConfirmationService(messageService) {
    var _this = _super.call(this, messageService) || this;
    _this.messageService = messageService;
    _this.key = 'abpConfirmation';
    _this.sticky = true;
    _this.destroy$ = new Subject();
    return _this;
  }
  /**
   * @param {?} message
   * @param {?} title
   * @param {?} severity
   * @param {?=} options
   * @return {?}
   */
  ConfirmationService.prototype.show
  /**
   * @param {?} message
   * @param {?} title
   * @param {?} severity
   * @param {?=} options
   * @return {?}
   */ = function(message, title, severity, options) {
    this.listenToEscape();
    return _super.prototype.show.call(this, message, title, severity, options);
  };
  /**
   * @param {?=} status
   * @return {?}
   */
  ConfirmationService.prototype.clear
  /**
   * @param {?=} status
   * @return {?}
   */ = function(status) {
    _super.prototype.clear.call(this, status);
    this.destroy$.next();
  };
  /**
   * @return {?}
   */
  ConfirmationService.prototype.listenToEscape
  /**
   * @return {?}
   */ = function() {
    var _this = this;
    fromEvent(document, 'keyup')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(150),
        filter(
          /**
           * @param {?} key
           * @return {?}
           */
          function(key) {
            return key && key.code === 'Escape';
          },
        ),
      )
      .subscribe(
        /**
         * @param {?} _
         * @return {?}
         */
        function(_) {
          _this.clear();
        },
      );
  };
  ConfirmationService.decorators = [{ type: Injectable, args: [{ providedIn: 'root' }] }];
  /** @nocollapse */
  ConfirmationService.ctorParameters = function() {
    return [{ type: MessageService }];
  };
  /** @nocollapse */ ConfirmationService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function ConfirmationService_Factory() {
      return new ConfirmationService(i0.ɵɵinject(i1.MessageService));
    },
    token: ConfirmationService,
    providedIn: 'root',
  });
  return ConfirmationService;
})(AbstractToaster);
export { ConfirmationService };
if (false) {
  /** @type {?} */
  ConfirmationService.prototype.key;
  /** @type {?} */
  ConfirmationService.prototype.sticky;
  /** @type {?} */
  ConfirmationService.prototype.destroy$;
  /**
   * @type {?}
   * @protected
   */
  ConfirmationService.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWJwL25nLnRoZW1lLnNoYXJlZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb25maXJtYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR2pFO0lBQ3lDLCtDQUFxQztJQU81RSw2QkFBc0IsY0FBOEI7UUFBcEQsWUFDRSxrQkFBTSxjQUFjLENBQUMsU0FDdEI7UUFGcUIsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBTnBELFNBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUV4QixZQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWQsY0FBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7O0lBSXpCLENBQUM7Ozs7Ozs7O0lBRUQsa0NBQUk7Ozs7Ozs7SUFBSixVQUNFLE9BQWUsRUFDZixLQUFhLEVBQ2IsUUFBMEIsRUFDMUIsT0FBOEI7UUFFOUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLE9BQU8saUJBQU0sSUFBSSxZQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBRUQsbUNBQUs7Ozs7SUFBTCxVQUFNLE1BQXVCO1FBQzNCLGlCQUFNLEtBQUssWUFBQyxNQUFNLENBQUMsQ0FBQztRQUVwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCw0Q0FBYzs7O0lBQWQ7UUFBQSxpQkFVQztRQVRDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO2FBQ3pCLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLE1BQU07Ozs7UUFBQyxVQUFDLEdBQWtCLElBQUssT0FBQSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQTVCLENBQTRCLEVBQUMsQ0FDN0Q7YUFDQSxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDO1lBQ1YsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOztnQkF2Q0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnQkFMekIsY0FBYzs7OzhCQUh2QjtDQWdEQyxBQXhDRCxDQUN5QyxlQUFlLEdBdUN2RDtTQXZDWSxtQkFBbUI7OztJQUM5QixrQ0FBd0I7O0lBRXhCLHFDQUFjOztJQUVkLHVDQUF5Qjs7Ozs7SUFFYiw2Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFRvYXN0ZXIgfSBmcm9tICcuLi9hYnN0cmFjdHMvdG9hc3Rlcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29uZmlybWF0aW9uJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9tZXNzYWdlc2VydmljZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCwgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSAnLi4vbW9kZWxzL3RvYXN0ZXInO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2UgZXh0ZW5kcyBBYnN0cmFjdFRvYXN0ZXI8Q29uZmlybWF0aW9uLk9wdGlvbnM+IHtcbiAga2V5ID0gJ2FicENvbmZpcm1hdGlvbic7XG5cbiAgc3RpY2t5ID0gdHJ1ZTtcblxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xuICAgIHN1cGVyKG1lc3NhZ2VTZXJ2aWNlKTtcbiAgfVxuXG4gIHNob3coXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgc2V2ZXJpdHk6IFRvYXN0ZXIuU2V2ZXJpdHksXG4gICAgb3B0aW9ucz86IENvbmZpcm1hdGlvbi5PcHRpb25zXG4gICk6IE9ic2VydmFibGU8VG9hc3Rlci5TdGF0dXM+IHtcbiAgICB0aGlzLmxpc3RlblRvRXNjYXBlKCk7XG5cbiAgICByZXR1cm4gc3VwZXIuc2hvdyhtZXNzYWdlLCB0aXRsZSwgc2V2ZXJpdHksIG9wdGlvbnMpO1xuICB9XG5cbiAgY2xlYXIoc3RhdHVzPzogVG9hc3Rlci5TdGF0dXMpIHtcbiAgICBzdXBlci5jbGVhcihzdGF0dXMpO1xuXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBsaXN0ZW5Ub0VzY2FwZSgpIHtcbiAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTUwKSxcbiAgICAgICAgZmlsdGVyKChrZXk6IEtleWJvYXJkRXZlbnQpID0+IGtleSAmJiBrZXkuY29kZSA9PT0gJ0VzY2FwZScpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19
