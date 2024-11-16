import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AggregateRowModel } from '@syncfusion/ej2-treegrid';


/**
 * `AggregateDirective` represent a aggregate row of the react TreeGrid. 
 * It must be contained in a TreeGrid component(`TreeGridComponent`). 
 * ```tsx
 * <TreeGridComponent dataSource={data} allowPaging={true} allowSorting={true}> 
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * </ColumnsDirective>
 * <AggregatesDirective>
 * <AggregateDirective>
 * <AggregateColumnsDirective>
 * <AggregateColumnDirective field='ID' type='Min'></AggregateColumnsDirective>
 * </<AggregateColumnsDirective>
* </AggregateDirective>
 * </AggregatesDirective>
 * </TreeGridComponent>
 * ```
 */
export class AggregateDirective extends ComplexBase<AggregateRowModel & { children?: React.ReactNode }, AggregateRowModel> {
    public static moduleName: string = 'aggregate';
}

export class AggregatesDirective extends ComplexBase<{}, {}> {
    public static propertyName: string = 'aggregates';
    public static moduleName: string = 'aggregates';
}
