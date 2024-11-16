import * as React from 'react';
import { Overview, OverviewModel } from '@syncfusion/ej2-diagrams';
import { ComponentBase, applyMixins, DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';



/**
 * Represents react Overview Component
 * ```tsx
 * <OverviewComponent></OverviewComponent>
 * ```
 */
export class OverviewComponent extends Overview {
    public state: Readonly<{ children?: React.ReactNode | React.ReactNode[] }> 
    & Readonly<OverviewModel | DefaultHtmlAttributes>;
    public setState: any;
    private getDefaultAttributes: Function;
    public initRenderCalled: boolean = false;
    private checkInjectedModules: boolean = false;
    private statelessTemplateProps: string[] = null;
    private templateProps: string[] = null;
    private immediateRender: boolean = true;
    public props: Readonly<{ children?: React.ReactNode | React.ReactNode[] }>
     & Readonly<OverviewModel | DefaultHtmlAttributes>;
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
            return React.createElement('div', this.getDefaultAttributes(),[].concat(this.props.children,this.portals));
        }

    }
}

applyMixins(OverviewComponent, [ComponentBase, React.Component]);
