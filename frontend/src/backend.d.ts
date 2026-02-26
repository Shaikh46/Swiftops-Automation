import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    clientName: string;
    feedback: string;
    company: string;
    profileImageUrl: string;
}
export interface backendInterface {
    addTestimonial(id: string, clientName: string, company: string, feedback: string, profileImageUrl: string): Promise<void>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getTestimonial(id: string): Promise<Testimonial | null>;
}
