import * as React from 'react';
import { TextArea, TextAreaModel } from '@syncfusion/ej2-inputs';
import { ComponentBase, applyMixins, DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';



/**
 * Represents the React TextArea Component
 * ```html
 * <TextArea value={value}></TextArea>
 * ```
 */
export class TextAreaComponent extends TextArea {
    public state: Readonly<{ children?: React.ReactNode | React.ReactNode[] }> 
    & Readonly<TextAreaModel | DefaultHtmlAttributes>;
    public setState: any;
    private getDefaultAttributes: Function;
    public initRenderCalled: boolean = false;
    private checkInjectedModules: boolean = false;
    private statelessTemplateProps: string[] = null;
    private templateProps: string[] = null;
    private immediateRender: boolean = true;
    public props: Readonly<{ children?: React.ReactNode | React.ReactNode[] }>
     & Readonly<TextAreaModel | DefaultHtmlAttributes>;
    public forceUpdate: (callBack?: () => any) => void;
    public context: Object;
    public portals: any = [];
    public isReactComponent: Object;
    public refs: {
        [key: string]: React.ReactInstance
    };
    constructor(props: any) {
        super(props);
    }

    public render(): any {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !(this as any).isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        } else {
            return React.createElement((React as any).Fragment, null,[].concat(React.createElement("textarea", this.getDefaultAttributes()),this.portals));
        }

    }
}

applyMixins(TextAreaComponent, [ComponentBase, React.Component]);
