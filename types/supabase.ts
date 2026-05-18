export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      account: {
        Row: {
          accessToken: string | null;
          accessTokenExpiresAt: string | null;
          accountId: string;
          createdAt: string;
          id: string;
          idToken: string | null;
          password: string | null;
          providerId: string;
          refreshToken: string | null;
          refreshTokenExpiresAt: string | null;
          scope: string | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId: string;
          createdAt?: string;
          id: string;
          idToken?: string | null;
          password?: string | null;
          providerId: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId?: string;
          createdAt?: string;
          id?: string;
          idToken?: string | null;
          password?: string | null;
          providerId?: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "account_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      assessments: {
        Row: {
          created_at: string;
          grade: number | null;
          id: number;
          name: string;
          scheme_id: number | null;
          student_module_id: number;
          updated_at: string;
          weight: number;
        };
        Insert: {
          created_at?: string;
          grade?: number | null;
          id?: never;
          name: string;
          scheme_id?: number | null;
          student_module_id: number;
          updated_at?: string;
          weight: number;
        };
        Update: {
          created_at?: string;
          grade?: number | null;
          id?: never;
          name?: string;
          scheme_id?: number | null;
          student_module_id?: number;
          updated_at?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "assessments_scheme_id_fkey";
            columns: ["scheme_id"];
            isOneToOne: false;
            referencedRelation: "module_assessments_scheme";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assessments_student_module_id_fkey";
            columns: ["student_module_id"];
            isOneToOne: false;
            referencedRelation: "student_modules";
            referencedColumns: ["id"];
          },
        ];
      };
      module_assessments_scheme: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          module_id: number;
          name: string;
          type: string;
          updated_at: string;
          weight: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: never;
          module_id: number;
          name: string;
          type: string;
          updated_at?: string;
          weight: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: never;
          module_id?: number;
          name?: string;
          type?: string;
          updated_at?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "module_assessments_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      modules: {
        Row: {
          code: string;
          created_at: string;
          credits: number;
          id: number;
          is_optional: boolean;
          name: string;
          year: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          credits: number;
          id?: never;
          is_optional?: boolean;
          name: string;
          year: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          credits?: number;
          id?: never;
          is_optional?: boolean;
          name?: string;
          year?: number;
        };
        Relationships: [];
      };
      session: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          ipAddress: string | null;
          token: string;
          updatedAt: string;
          userAgent: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          expiresAt: string;
          id: string;
          ipAddress?: string | null;
          token: string;
          updatedAt: string;
          userAgent?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          ipAddress?: string | null;
          token?: string;
          updatedAt?: string;
          userAgent?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "session_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      student_modules: {
        Row: {
          created_at: string;
          custom_credits: number | null;
          custom_name: string | null;
          id: number;
          module_id: number | null;
          student_profile_id: number;
        };
        Insert: {
          created_at?: string;
          custom_credits?: number | null;
          custom_name?: string | null;
          id?: never;
          module_id?: number | null;
          student_profile_id: number;
        };
        Update: {
          created_at?: string;
          custom_credits?: number | null;
          custom_name?: string | null;
          id?: never;
          module_id?: number | null;
          student_profile_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "student_modules_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_modules_student_profile_id_fkey";
            columns: ["student_profile_id"];
            isOneToOne: false;
            referencedRelation: "student_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      student_profiles: {
        Row: {
          created_at: string;
          id: number;
          onboarding_step: number;
          target_grade: number | null;
          user_id: string;
          year: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          onboarding_step?: number;
          target_grade?: number | null;
          user_id: string;
          year?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          onboarding_step?: number;
          target_grade?: number | null;
          user_id?: string;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          createdAt: string;
          email: string;
          emailVerified: boolean;
          id: string;
          image: string | null;
          name: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          email: string;
          emailVerified: boolean;
          id: string;
          image?: string | null;
          name: string;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          email?: string;
          emailVerified?: boolean;
          id?: string;
          image?: string | null;
          name?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      verification: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt: string;
          value: string;
        };
        Insert: {
          createdAt?: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt?: string;
          value: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          identifier?: string;
          updatedAt?: string;
          value?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
