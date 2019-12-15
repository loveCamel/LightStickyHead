const DEFAULT_TOP_MARGIN: number = 100;

export interface ILightStickyHead {
  clearEvents: () => void;
}

export interface ILightStickyHeadOptions {
  header: string;
  topMargin?: number;
  activeClass?: string;
}

class LightStickyHead implements ILightStickyHead {
  private _header: HTMLElement;
  private _topMargin: number = DEFAULT_TOP_MARGIN;
  private _activeClass: string = 'active';

  constructor(props: ILightStickyHeadOptions) {
    this._header = document.querySelector(props.header);
    props.topMargin && (this._topMargin = props.topMargin);
    props.activeClass && (this._activeClass = props.activeClass);
    this._init();
  }

  public clearEvents = (): void => {
    document.removeEventListener('scroll', this._onScroll);
  }

  private _getY = (): number => {
    return window.pageYOffset;
  }

  private _isScroll = (): boolean => {
    return this._getY() > this._topMargin;
  }

  private _hasActiveClass = (): boolean => {
    return this._header.classList.contains(this._activeClass);
  }

  private _setActiveClass = (): void => {
    this._header.classList.add(this._activeClass);
  }

  private _removeActiveClass = (): void => {
    this._header.classList.remove(this._activeClass);
  }

  private _onScroll = (): void => {
    if (this._isScroll()) {
      if (!this._hasActiveClass()) {
        this._setActiveClass();
      }
    } else {
      this._removeActiveClass();
    }
  }

  private _init = (): void => {
    document.addEventListener('scroll', this._onScroll);
  }
}

export default LightStickyHead;
