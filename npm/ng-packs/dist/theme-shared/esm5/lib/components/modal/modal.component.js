/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from 'tslib';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { ConfirmationService } from '../../services/confirmation.service';
import { ButtonComponent } from '../button/button.component';
import { backdropAnimation, dialogAnimation } from './modal.animations';
var ModalComponent = /** @class */ (function() {
  function ModalComponent(renderer, confirmationService) {
    this.renderer = renderer;
    this.confirmationService = confirmationService;
    this.centered = false;
    this.modalClass = '';
    this.size = 'lg';
    this.visibleChange = new EventEmitter();
    this.init = new EventEmitter();
    this.appear = new EventEmitter();
    this.disappear = new EventEmitter();
    this._visible = false;
    this._busy = false;
    this.isModalOpen = false;
    this.isConfirmationOpen = false;
    this.destroy$ = new Subject();
  }
  Object.defineProperty(ModalComponent.prototype, 'visible', {
    /**
     * @return {?}
     */
    get: function() {
      return this._visible;
    },
    /**
     * @param {?} value
     * @return {?}
     */
    set: function(value) {
      var _this = this;
      if (typeof value !== 'boolean') return;
      this.isModalOpen = value;
      this._visible = value;
      this.visibleChange.emit(value);
      if (value) {
        setTimeout(
          /**
           * @return {?}
           */
          function() {
            return _this.listen();
          },
          0,
        );
        this.renderer.addClass(document.body, 'modal-open');
        this.appear.emit();
      } else {
        this.renderer.removeClass(document.body, 'modal-open');
        this.disappear.emit();
      }
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(ModalComponent.prototype, 'busy', {
    /**
     * @return {?}
     */
    get: function() {
      return this._busy;
    },
    /**
     * @param {?} value
     * @return {?}
     */
    set: function(value) {
      if (this.abpSubmit && this.abpSubmit instanceof ButtonComponent) {
        this.abpSubmit.loading = value;
      }
      this._busy = value;
    },
    enumerable: true,
    configurable: true,
  });
  /**
   * @return {?}
   */
  ModalComponent.prototype.ngOnDestroy
  /**
   * @return {?}
   */ = function() {
    this.destroy$.next();
  };
  /**
   * @return {?}
   */
  ModalComponent.prototype.close
  /**
   * @return {?}
   */ = function() {
    var _this = this;
    if (this.busy) return;
    /** @type {?} */
    var nodes = getFlatNodes(
      /** @type {?} */ (this.modalContent.nativeElement.querySelector('#abp-modal-body')).childNodes,
    );
    if (hasNgDirty(nodes)) {
      if (this.isConfirmationOpen) return;
      this.isConfirmationOpen = true;
      this.confirmationService
        .warn('AbpAccount::AreYouSureYouWantToCancelEditingWarningMessage', 'AbpAccount::AreYouSure')
        .subscribe(
          /**
           * @param {?} status
           * @return {?}
           */
          function(status) {
            _this.isConfirmationOpen = false;
            if (status === 'confirm' /* confirm */) {
              _this.visible = false;
            }
          },
        );
    } else {
      this.visible = false;
    }
  };
  /**
   * @return {?}
   */
  ModalComponent.prototype.listen
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
          _this.close();
        },
      );
    setTimeout(
      /**
       * @return {?}
       */
      function() {
        if (!_this.abpClose) return;
        fromEvent(_this.abpClose.nativeElement, 'click')
          .pipe(
            takeUntil(_this.destroy$),
            filter(
              /**
               * @return {?}
               */
              function() {
                return !!_this.modalContent;
              },
            ),
          )
          .subscribe(
            /**
             * @return {?}
             */
            function() {
              return _this.close();
            },
          );
      },
      0,
    );
    this.init.emit();
  };
  ModalComponent.decorators = [
    {
      type: Component,
      args: [
        {
          selector: 'abp-modal',
          template:
            '<ng-container *ngIf="visible">\n  <div class="modal show {{ modalClass }}" tabindex="-1" role="dialog">\n    <div class="modal-backdrop" [@backdrop]="isModalOpen" (click)="close()"></div>\n    <div\n      id="abp-modal-dialog"\n      class="modal-dialog modal-{{ size }}"\n      role="document"\n      [@dialog]="isModalOpen"\n      #abpModalContent\n    >\n      <div id="abp-modal-content" class="modal-content">\n        <div id="abp-modal-header" class="modal-header">\n          <ng-container *ngTemplateOutlet="abpHeader"></ng-container>\n          \u200B\n          <button id="abp-modal-close-button" type="button" class="close" aria-label="Close" (click)="close()">\n            <span aria-hidden="true">&times;</span>\n          </button>\n        </div>\n        <div id="abp-modal-body" class="modal-body">\n          <ng-container *ngTemplateOutlet="abpBody"></ng-container>\n        </div>\n        <div id="abp-modal-footer" class="modal-footer">\n          <ng-container *ngTemplateOutlet="abpFooter"></ng-container>\n        </div>\n      </div>\n    </div>\n    <ng-content></ng-content>\n  </div>\n</ng-container>\n',
          animations: [backdropAnimation, dialogAnimation],
        },
      ],
    },
  ];
  /** @nocollapse */
  ModalComponent.ctorParameters = function() {
    return [{ type: Renderer2 }, { type: ConfirmationService }];
  };
  ModalComponent.propDecorators = {
    visible: [{ type: Input }],
    busy: [{ type: Input }],
    centered: [{ type: Input }],
    modalClass: [{ type: Input }],
    size: [{ type: Input }],
    abpSubmit: [{ type: ContentChild, args: [ButtonComponent, { static: false, read: ButtonComponent }] }],
    abpHeader: [{ type: ContentChild, args: ['abpHeader', { static: false }] }],
    abpBody: [{ type: ContentChild, args: ['abpBody', { static: false }] }],
    abpFooter: [{ type: ContentChild, args: ['abpFooter', { static: false }] }],
    abpClose: [{ type: ContentChild, args: ['abpClose', { static: false, read: ElementRef }] }],
    modalContent: [{ type: ViewChild, args: ['abpModalContent', { static: false }] }],
    abpButtons: [{ type: ViewChildren, args: ['abp-button'] }],
    visibleChange: [{ type: Output }],
    init: [{ type: Output }],
    appear: [{ type: Output }],
    disappear: [{ type: Output }],
  };
  return ModalComponent;
})();
export { ModalComponent };
if (false) {
  /** @type {?} */
  ModalComponent.prototype.centered;
  /** @type {?} */
  ModalComponent.prototype.modalClass;
  /** @type {?} */
  ModalComponent.prototype.size;
  /** @type {?} */
  ModalComponent.prototype.abpSubmit;
  /** @type {?} */
  ModalComponent.prototype.abpHeader;
  /** @type {?} */
  ModalComponent.prototype.abpBody;
  /** @type {?} */
  ModalComponent.prototype.abpFooter;
  /** @type {?} */
  ModalComponent.prototype.abpClose;
  /** @type {?} */
  ModalComponent.prototype.modalContent;
  /** @type {?} */
  ModalComponent.prototype.abpButtons;
  /** @type {?} */
  ModalComponent.prototype.visibleChange;
  /** @type {?} */
  ModalComponent.prototype.init;
  /** @type {?} */
  ModalComponent.prototype.appear;
  /** @type {?} */
  ModalComponent.prototype.disappear;
  /** @type {?} */
  ModalComponent.prototype._visible;
  /** @type {?} */
  ModalComponent.prototype._busy;
  /** @type {?} */
  ModalComponent.prototype.isModalOpen;
  /** @type {?} */
  ModalComponent.prototype.isConfirmationOpen;
  /** @type {?} */
  ModalComponent.prototype.destroy$;
  /**
   * @type {?}
   * @private
   */
  ModalComponent.prototype.renderer;
  /**
   * @type {?}
   * @private
   */
  ModalComponent.prototype.confirmationService;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function getFlatNodes(nodes) {
  return Array.from(nodes).reduce(
    /**
     * @param {?} acc
     * @param {?} val
     * @return {?}
     */
    function(acc, val) {
      return tslib_1.__spread(acc, val.childNodes && val.childNodes.length ? getFlatNodes(val.childNodes) : [val]);
    },
    [],
  );
}
/**
 * @param {?} nodes
 * @return {?}
 */
function hasNgDirty(nodes) {
  return (
    nodes.findIndex(
      /**
       * @param {?} node
       * @return {?}
       */
      function(node) {
        return (node.className || '').indexOf('ng-dirty') > -1;
      },
    ) > -1
  );
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFicC9uZy50aGVtZS5zaGFyZWQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJeEU7SUErRUUsd0JBQW9CLFFBQW1CLEVBQVUsbUJBQXdDO1FBQXJFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBeENoRixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsU0FBSSxHQUFjLElBQUksQ0FBQztRQWtCYixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFNUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFaEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVq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QUFFLENBQ0gsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBb0I7SUFDdEMsT0FBTyxLQUFLLENBQUMsU0FBUzs7OztJQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBL0MsQ0FBK0MsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvdG9hc3Rlcic7XG5pbXBvcnQgeyBDb25maXJtYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlybWF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgYmFja2Ryb3BBbmltYXRpb24sIGRpYWxvZ0FuaW1hdGlvbiB9IGZyb20gJy4vbW9kYWwuYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIE1vZGFsU2l6ZSA9ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FicC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIGFuaW1hdGlvbnM6IFtiYWNrZHJvcEFuaW1hdGlvbiwgZGlhbG9nQW5pbWF0aW9uXSxcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJykgcmV0dXJuO1xuXG4gICAgdGhpcy5pc01vZGFsT3BlbiA9IHZhbHVlO1xuICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5saXN0ZW4oKSwgMCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgICB0aGlzLmFwcGVhci5lbWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICAgIHRoaXMuZGlzYXBwZWFyLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgYnVzeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYnVzeTtcbiAgfVxuICBzZXQgYnVzeSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmFicFN1Ym1pdCAmJiB0aGlzLmFicFN1Ym1pdCBpbnN0YW5jZW9mIEJ1dHRvbkNvbXBvbmVudCkge1xuICAgICAgdGhpcy5hYnBTdWJtaXQubG9hZGluZyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX2J1c3kgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIGNlbnRlcmVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbW9kYWxDbGFzcyA9ICcnO1xuXG4gIEBJbnB1dCgpIHNpemU6IE1vZGFsU2l6ZSA9ICdsZyc7XG5cbiAgQENvbnRlbnRDaGlsZChCdXR0b25Db21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogQnV0dG9uQ29tcG9uZW50IH0pXG4gIGFicFN1Ym1pdDogQnV0dG9uQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoJ2FicEhlYWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBhYnBIZWFkZXI6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZCgnYWJwQm9keScsIHsgc3RhdGljOiBmYWxzZSB9KSBhYnBCb2R5OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoJ2FicEZvb3RlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBhYnBGb290ZXI6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZCgnYWJwQ2xvc2UnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWYgfSlcbiAgYWJwQ2xvc2U6IEVsZW1lbnRSZWY8YW55PjtcblxuICBAVmlld0NoaWxkKCdhYnBNb2RhbENvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgbW9kYWxDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGRyZW4oJ2FicC1idXR0b24nKSBhYnBCdXR0b25zO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSB2aXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBhcHBlYXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRpc2FwcGVhciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfdmlzaWJsZSA9IGZhbHNlO1xuXG4gIF9idXN5ID0gZmFsc2U7XG5cbiAgaXNNb2RhbE9wZW4gPSBmYWxzZTtcblxuICBpc0NvbmZpcm1hdGlvbk9wZW4gPSBmYWxzZTtcblxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNvbmZpcm1hdGlvblNlcnZpY2U6IENvbmZpcm1hdGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5idXN5KSByZXR1cm47XG5cbiAgICBjb25zdCBub2RlcyA9IGdldEZsYXROb2RlcyhcbiAgICAgICh0aGlzLm1vZGFsQ29udGVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYnAtbW9kYWwtYm9keScpIGFzIEhUTUxFbGVtZW50KS5jaGlsZE5vZGVzLFxuICAgICk7XG5cbiAgICBpZiAoaGFzTmdEaXJ0eShub2RlcykpIHtcbiAgICAgIGlmICh0aGlzLmlzQ29uZmlybWF0aW9uT3BlbikgcmV0dXJuO1xuXG4gICAgICB0aGlzLmlzQ29uZmlybWF0aW9uT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2VcbiAgICAgICAgLndhcm4oJ0FicEFjY291bnQ6OkFyZVlvdVN1cmVZb3VXYW50VG9DYW5jZWxFZGl0aW5nV2FybmluZ01lc3NhZ2UnLCAnQWJwQWNjb3VudDo6QXJlWW91U3VyZScpXG4gICAgICAgIC5zdWJzY3JpYmUoKHN0YXR1czogVG9hc3Rlci5TdGF0dXMpID0+IHtcbiAgICAgICAgICB0aGlzLmlzQ29uZmlybWF0aW9uT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IFRvYXN0ZXIuU3RhdHVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbigpIHtcbiAgICBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTUwKSxcbiAgICAgICAgZmlsdGVyKChrZXk6IEtleWJvYXJkRXZlbnQpID0+IGtleSAmJiBrZXkuY29kZSA9PT0gJ0VzY2FwZScpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5hYnBDbG9zZSkgcmV0dXJuO1xuICAgICAgZnJvbUV2ZW50KHRoaXMuYWJwQ2xvc2UubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgIGZpbHRlcigoKSA9PiAhIXRoaXMubW9kYWxDb250ZW50KSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfSwgMCk7XG5cbiAgICB0aGlzLmluaXQuZW1pdCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZsYXROb2Rlcyhub2RlczogTm9kZUxpc3QpOiBIVE1MRWxlbWVudFtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20obm9kZXMpLnJlZHVjZShcbiAgICAoYWNjLCB2YWwpID0+IFsuLi5hY2MsIC4uLih2YWwuY2hpbGROb2RlcyAmJiB2YWwuY2hpbGROb2Rlcy5sZW5ndGggPyBnZXRGbGF0Tm9kZXModmFsLmNoaWxkTm9kZXMpIDogW3ZhbF0pXSxcbiAgICBbXSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gaGFzTmdEaXJ0eShub2RlczogSFRNTEVsZW1lbnRbXSkge1xuICByZXR1cm4gbm9kZXMuZmluZEluZGV4KG5vZGUgPT4gKG5vZGUuY2xhc3NOYW1lIHx8ICcnKS5pbmRleE9mKCduZy1kaXJ0eScpID4gLTEpID4gLTE7XG59XG4iXX0=
