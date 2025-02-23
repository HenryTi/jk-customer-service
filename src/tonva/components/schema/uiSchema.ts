import { Context } from '../form/context';
import { FieldRule, ContextRule } from '../form/rules';
import { ItemSchema } from './schema';
import { FieldProps } from '../form/field';
import { Widget } from '../form/widgets';

export type TypeWidget = new (context:Context, itemSchema:ItemSchema, fieldProps:FieldProps, children: React.ReactNode) => Widget;

export type UiType =  'form' | 'arr' | 'group' | 'button' | 'submit' | 'custom' | 'image'
    | 'id'
    | 'text' | 'textarea' | 'password' 
    | 'date' | 'datetime' | 'select' | 'url' | 'email'
    | 'updown' | 'color' | 'checkbox' | 'checkboxes' | 'radio' | 'range';

export type ChangingHandler = (context:Context, value:any, prev:any) => boolean;
export type ChangedHandler = (context:Context, value:any, prev:any) => void;

export interface UiItem {
    widget?: UiType;
    readOnly?: boolean;
    disabled?: boolean;
    visible?: boolean;
    label?: string;
    className?: string;
    onChanging?: ChangingHandler;
    onChanged?: ChangedHandler;
    rules?: (ContextRule|FieldRule) | (ContextRule|FieldRule)[];
    Templet?: TempletType;
    discription?: (string | JSX.Element | (()=>JSX.Element));
    discriptionClassName?: string;
}

export interface UiCustom extends UiItem {
    widget: 'custom';
    WidgetClass: TypeWidget;
}

export interface UiImageItem extends UiItem {
    widget: 'image',
}

export interface UiIdItem extends UiItem {
    widget: 'id';
    placeholder?: string | JSX.Element;
    //Templet?: (context:Context, name:string, value:number) => JSX.Element;
    pickId?: (context:Context, name:string, value:number) => Promise<any>;
}

export interface UiInputItem extends UiItem {
    placeholder?: string;
    rules?: FieldRule | FieldRule[];
}

export interface UiTextItem extends UiInputItem {
    widget: 'text';
    //maxLength?: number;
}

export interface UiTextAreaItem extends UiInputItem {
    widget: 'textarea';
    rows?: number;
}

export interface UiPasswordItem extends UiInputItem {
    widget: 'password';
    //maxLength?: number;
}

export interface UiRange extends UiInputItem {
    widget: 'range';
    min?: number;
    max?: number;
    step?: number;
}

export interface UiCheckItem extends UiItem {
    widget: 'checkbox';
    trueValue?: any;
    falseValue?: any;
}

export interface UiSelectListItem {
    value:any;
    title:string;
}
export interface UiSelectBase extends UiItem {
    rules?: FieldRule | FieldRule[];
    defaultValue: any;
    list: UiSelectListItem[];
}

export interface UiSelect extends UiSelectBase {
    widget: 'select';
}

export interface UiRadio extends UiSelectBase {
    widget: 'radio';
}

export interface UiItemCollection {
    [field: string]: UiItem;
}

export type TempletType = ((item?:any)=>JSX.Element) | JSX.Element;
export interface UiSchema {
    items?: UiItemCollection;
    Templet?: TempletType;
    readonly?: boolean;
    disabled?: boolean;
    className?: string;
    selectable?: boolean;
    deletable?: boolean;
    restorable?: boolean;
    rules?: ContextRule | ContextRule[];
}

export interface UiArr extends UiSchema, UiItem {
    widget: 'arr';
    rules?: ContextRule | ContextRule[];
    ArrContainer?: (label:any, content:JSX.Element) => JSX.Element;
    RowContainer?: (content:JSX.Element) => JSX.Element;
    RowSeperator?: JSX.Element;
}

export interface UiGroup extends UiItem {
    widget: 'group';
    with: string[];     // field names
}

export interface UiButton extends UiItem {
    widget: 'button';
}
