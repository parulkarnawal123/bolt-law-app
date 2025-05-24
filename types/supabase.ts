export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          sections_count: number
          is_pinned: boolean
          is_new: boolean
          last_accessed: string
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          sections_count?: number
          is_pinned?: boolean
          is_new?: boolean
          last_accessed?: string
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          sections_count?: number
          is_pinned?: boolean
          is_new?: boolean
          last_accessed?: string
          last_updated?: string
          created_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          book_id: string
          title: string
          description: string | null
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          book_id: string
          title: string
          description?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          title?: string
          description?: string | null
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          section_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          section_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          section_id?: string
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          created_at?: string
        }
      }
      section_tags: {
        Row: {
          id: string
          tag_id: string
          section_id: string
          created_at: string
        }
        Insert: {
          id?: string
          tag_id: string
          section_id: string
          created_at?: string
        }
        Update: {
          id?: string
          tag_id?: string
          section_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}