export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      assets: {
        Row: {
          acquisition_date: string | null;
          created_at: string | null;
          current_value: number;
          id: string;
          name: string;
          quantity: number;
          symbol: string | null;
          type: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          acquisition_date?: string | null;
          created_at?: string | null;
          current_value?: number;
          id?: string;
          name: string;
          quantity?: number;
          symbol?: string | null;
          type: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          acquisition_date?: string | null;
          created_at?: string | null;
          current_value?: number;
          id?: string;
          name?: string;
          quantity?: number;
          symbol?: string | null;
          type?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      budget_categories: {
        Row: {
          assigned_budget: number;
          created_at: string;
          daily_allowance: number | null;
          icon: string | null;
          id: string;
          priority: number | null;
          spent_so_far: number | null;
          title: string;
          user_id: string;
        };
        Insert: {
          assigned_budget: number;
          created_at?: string;
          daily_allowance?: number | null;
          icon?: string | null;
          id?: string;
          priority?: number | null;
          spent_so_far?: number | null;
          title: string;
          user_id: string;
        };
        Update: {
          assigned_budget?: number;
          created_at?: string;
          daily_allowance?: number | null;
          icon?: string | null;
          id?: string;
          priority?: number | null;
          spent_so_far?: number | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      budget_setup: {
        Row: {
          created_at: string;
          currency: string | null;
          fixed_expenses: number | null;
          id: string;
          monthly_income: number | null;
          monthly_savings: number | null;
          user_id: string;
          variable_expenses: number | null;
        };
        Insert: {
          created_at?: string;
          currency?: string | null;
          fixed_expenses?: number | null;
          id?: string;
          monthly_income?: number | null;
          monthly_savings?: number | null;
          user_id: string;
          variable_expenses?: number | null;
        };
        Update: {
          created_at?: string;
          currency?: string | null;
          fixed_expenses?: number | null;
          id?: string;
          monthly_income?: number | null;
          monthly_savings?: number | null;
          user_id?: string;
          variable_expenses?: number | null;
        };
        Relationships: [];
      };
      currency_preferences: {
        Row: {
          created_at: string;
          currency: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      dashboard_preferences: {
        Row: {
          created_at: string | null;
          id: string;
          layout_type: string;
          theme: string;
          updated_at: string | null;
          user_id: string;
          widget_order: Json | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          layout_type?: string;
          theme?: string;
          updated_at?: string | null;
          user_id: string;
          widget_order?: Json | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          layout_type?: string;
          theme?: string;
          updated_at?: string | null;
          user_id?: string;
          widget_order?: Json | null;
        };
        Relationships: [];
      };
      dashboard_widgets: {
        Row: {
          created_at: string | null;
          enabled: boolean | null;
          id: string;
          position: number | null;
          settings: Json | null;
          title: string;
          updated_at: string | null;
          user_id: string;
          widget_type: string;
        };
        Insert: {
          created_at?: string | null;
          enabled?: boolean | null;
          id?: string;
          position?: number | null;
          settings?: Json | null;
          title: string;
          updated_at?: string | null;
          user_id: string;
          widget_type: string;
        };
        Update: {
          created_at?: string | null;
          enabled?: boolean | null;
          id?: string;
          position?: number | null;
          settings?: Json | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
          widget_type?: string;
        };
        Relationships: [];
      };
      debt_simulations: {
        Row: {
          created_at: string;
          debt_id: string;
          extra_payment: number | null;
          id: string;
          monthly_payment: number;
          projected_payoff_date: string | null;
          strategy_type: string;
          total_interest: number | null;
          total_interest_saved: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          debt_id: string;
          extra_payment?: number | null;
          id?: string;
          monthly_payment: number;
          projected_payoff_date?: string | null;
          strategy_type: string;
          total_interest?: number | null;
          total_interest_saved?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          debt_id?: string;
          extra_payment?: number | null;
          id?: string;
          monthly_payment?: number;
          projected_payoff_date?: string | null;
          strategy_type?: string;
          total_interest?: number | null;
          total_interest_saved?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      debts: {
        Row: {
          created_at: string | null;
          debt_to_income: number;
          due_date: string;
          icon: string | null;
          id: string;
          interest_rate: number;
          monthly_payment: number;
          remaining_debt: number;
          remaining_term: string;
          title: string;
          total_debt: number;
          user_id: string;
          year_change: number | null;
        };
        Insert: {
          created_at?: string | null;
          debt_to_income: number;
          due_date: string;
          icon?: string | null;
          id?: string;
          interest_rate: number;
          monthly_payment: number;
          remaining_debt: number;
          remaining_term: string;
          title: string;
          total_debt: number;
          user_id: string;
          year_change?: number | null;
        };
        Update: {
          created_at?: string | null;
          debt_to_income?: number;
          due_date?: string;
          icon?: string | null;
          id?: string;
          interest_rate?: number;
          monthly_payment?: number;
          remaining_debt?: number;
          remaining_term?: string;
          title?: string;
          total_debt?: number;
          user_id?: string;
          year_change?: number | null;
        };
        Relationships: [];
      };
      feedback: {
        Row: {
          created_at: string | null;
          feature: string;
          feedback: string;
          id: string;
          rating: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          feature: string;
          feedback: string;
          id?: string;
          rating: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          feature?: string;
          feedback?: string;
          id?: string;
          rating?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      financial_insights: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          priority: number | null;
          read: boolean | null;
          type: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          priority?: number | null;
          read?: boolean | null;
          type: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          priority?: number | null;
          read?: boolean | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      financial_transactions: {
        Row: {
          amount: number;
          category: string;
          created_at: string | null;
          icon: string | null;
          id: string;
          is_flagged: boolean | null;
          is_recurring: boolean | null;
          is_starred: boolean | null;
          merchant: string | null;
          notes: string | null;
          payment_method: string | null;
          tags: string[] | null;
          title: string;
          transaction_date: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          category: string;
          created_at?: string | null;
          icon?: string | null;
          id?: string;
          is_flagged?: boolean | null;
          is_recurring?: boolean | null;
          is_starred?: boolean | null;
          merchant?: string | null;
          notes?: string | null;
          payment_method?: string | null;
          tags?: string[] | null;
          title: string;
          transaction_date?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          category?: string;
          created_at?: string | null;
          icon?: string | null;
          id?: string;
          is_flagged?: boolean | null;
          is_recurring?: boolean | null;
          is_starred?: boolean | null;
          merchant?: string | null;
          notes?: string | null;
          payment_method?: string | null;
          tags?: string[] | null;
          title?: string;
          transaction_date?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      goals: {
        Row: {
          completion_date: string;
          created_at: string;
          currency: string | null;
          id: string;
          name: string;
          saved_amount: number | null;
          target_amount: number;
          user_id: string;
        };
        Insert: {
          completion_date: string;
          created_at?: string;
          currency?: string | null;
          id?: string;
          name: string;
          saved_amount?: number | null;
          target_amount: number;
          user_id: string;
        };
        Update: {
          completion_date?: string;
          created_at?: string;
          currency?: string | null;
          id?: string;
          name?: string;
          saved_amount?: number | null;
          target_amount?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      portfolio_history: {
        Row: {
          asset_id: string;
          created_at: string | null;
          date: string | null;
          id: string;
          user_id: string;
          value: number;
        };
        Insert: {
          asset_id: string;
          created_at?: string | null;
          date?: string | null;
          id?: string;
          user_id: string;
          value: number;
        };
        Update: {
          asset_id?: string;
          created_at?: string | null;
          date?: string | null;
          id?: string;
          user_id?: string;
          value?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          role: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      stats: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          user_id: string;
          value: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
          user_id: string;
          value: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
          value?: number;
        };
        Relationships: [];
      };
      stocks: {
        Row: {
          after_hours_change: number | null;
          after_hours_price: number | null;
          currency: string;
          current_price: number;
          high_price: number | null;
          id: string;
          last_updated: string | null;
          logo_url: string | null;
          low_price: number | null;
          open_price: number | null;
          price_change_percentage: number | null;
          quantity_owned: number;
          stock_name: string;
          ticker: string;
          total_value: number | null;
          user_id: string;
          year_high: number | null;
          year_low: number | null;
        };
        Insert: {
          after_hours_change?: number | null;
          after_hours_price?: number | null;
          currency?: string;
          current_price: number;
          high_price?: number | null;
          id?: string;
          last_updated?: string | null;
          logo_url?: string | null;
          low_price?: number | null;
          open_price?: number | null;
          price_change_percentage?: number | null;
          quantity_owned: number;
          stock_name: string;
          ticker: string;
          total_value?: number | null;
          user_id: string;
          year_high?: number | null;
          year_low?: number | null;
        };
        Update: {
          after_hours_change?: number | null;
          after_hours_price?: number | null;
          currency?: string;
          current_price?: number;
          high_price?: number | null;
          id?: string;
          last_updated?: string | null;
          logo_url?: string | null;
          low_price?: number | null;
          open_price?: number | null;
          price_change_percentage?: number | null;
          quantity_owned?: number;
          stock_name?: string;
          ticker?: string;
          total_value?: number | null;
          user_id?: string;
          year_high?: number | null;
          year_low?: number | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          amount: number;
          category: string;
          created_at: string;
          email: string | null;
          frequency: string;
          id: string;
          image_url: string | null;
          name: string;
          next_payment_date: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          category?: string;
          created_at?: string;
          email?: string | null;
          frequency?: string;
          id?: string;
          image_url?: string | null;
          name: string;
          next_payment_date: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          category?: string;
          created_at?: string;
          email?: string | null;
          frequency?: string;
          id?: string;
          image_url?: string | null;
          name?: string;
          next_payment_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      transaction_tags: {
        Row: {
          color: string;
          created_at: string | null;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          color?: string;
          created_at?: string | null;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          color?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          user_id?: string;
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
