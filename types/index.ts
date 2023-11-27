import { DraggableData, DraggableEventHandler } from "react-draggable"

export interface SalesData {
    id: number,
    name: string,
    sales_id: string,
    item_id: number,
    qty: number,
    consumen_name: string,
    transaction_date: Date
}

export interface UsersData {
    id: string,
    name: string,
    email: string,
    country_name: string,
    device_id: string,
    bitcoin_address: string,
    avatar: string,
    login_ip: string,
    active_device_mac: string,
    notes: string,
    age: number,
    referral_id: number,
    locale: string,
    favorite_music: string,
    phone_number: string,
    twitter_username: string,
    job: string,
    invoice_email_address: string,
    hmac_secret: string,
    favorite_quote: string,
    primary_color: string,
    secondary_color: string,
    material: string,
    shipping_address: string,
    zip_code: string,
    latitude: string,
    longitude: string,
    favorite_animal: string,
    app_version: string,
    timezone: string
}

export interface GetAllSalesResponse<T> {
    data: SalesData[],
    message?: string
}

export interface SalesProps {
    // data: GetAllSalesResponse<SalesData>;
    data: SalesData[]
}

export interface HeaderProps {
    title: string,
    description: string
}

export interface TableViewProps {
    width: number,
    height: number,
    data: UsersData[] | SalesData[],
    children: React.ReactNode
}

export interface ColumnHeaderProps {
    // cellRenderer: () => {},
    label: string
    width: number
}

export interface DragHandlerProps {
    e: MouseEvent
    data: DraggableData
    index: number
}

export interface DragButtonProps {
    onDrag: DraggableEventHandler
}

export interface PostUser {
    name: string
    email: string
}