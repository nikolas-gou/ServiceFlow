import api from '../../utils/api';
import type {
  CustomerSuggestion,
  MotorSuggestions,
  SuggestedMeta,
  SuggestedResult,
  SuggestionStructure,
} from '../../types/suggested';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

export class SuggestedRepository {
  static async getSuggested(): Promise<SuggestedResult> {
    try {
      const { data: response } = await api.get('/api/suggested/form-values');
      return SuggestedRepository.normalizeResponse(response);
    } catch (error) {
      console.error('Error fetching suggested cross sections:', error);
      throw error;
    }
  }

  static normalizeResponse(response: unknown): SuggestedResult {
    if (!isPlainObject(response)) {
      console.error('Unexpected response format:', response);
      return SuggestedRepository.emptyResult('Unexpected response format');
    }

    const { data = null, meta = null } = response as { data?: unknown; meta?: unknown };

    if (!isPlainObject(data)) {
      console.warn('Response data is not an object:', data);
      return SuggestedRepository.emptyResult('Response data is not an object');
    }

    return {
      data: {
        motor: SuggestedRepository.ensureMotorStructure(data.motor),
        customer: SuggestedRepository.ensureSuggestionStructure<CustomerSuggestion>(data.customer),
      },
      meta: SuggestedRepository.ensureMetaStructure(meta),
    };
  }

  static emptyResult(message: string): SuggestedResult {
    return {
      data: {
        motor: SuggestedRepository.emptyMotorSuggestions(),
        customer: SuggestedRepository.emptySuggestion<CustomerSuggestion>(),
      },
      meta: {
        hasErrors: true,
        errors: [{ scope: 'response', message, details: null }],
      },
    };
  }

  static emptySuggestion<T>(): SuggestionStructure<T> {
    return { data: [], error: null, details: null };
  }

  static emptyMotorSuggestions(): MotorSuggestions {
    return {
      crossSection: SuggestedRepository.emptySuggestion<string>(),
      step: SuggestedRepository.emptySuggestion<string>(),
      manufacturer: SuggestedRepository.emptySuggestion<string>(),
      description: SuggestedRepository.emptySuggestion<string>(),
    };
  }

  static ensureSuggestionStructure<T>(value: unknown): SuggestionStructure<T> {
    if (!isPlainObject(value)) {
      return SuggestedRepository.emptySuggestion<T>();
    }

    return {
      data: Array.isArray(value.data) ? (value.data as T[]) : [],
      error: (value.error as string | null) ?? null,
      details: value.details ?? null,
    };
  }

  static ensureMotorStructure(motor: unknown): MotorSuggestions {
    if (!isPlainObject(motor)) {
      return SuggestedRepository.emptyMotorSuggestions();
    }

    return {
      crossSection: SuggestedRepository.ensureSuggestionStructure<string>(motor.crossSection),
      step: SuggestedRepository.ensureSuggestionStructure<string>(motor.step),
      manufacturer: SuggestedRepository.ensureSuggestionStructure<string>(motor.manufacturer),
      description: SuggestedRepository.ensureSuggestionStructure<string>(motor.description),
    };
  }

  static ensureMetaStructure(meta: unknown): SuggestedMeta {
    if (!isPlainObject(meta)) {
      return { hasErrors: false, errors: [] };
    }

    return {
      hasErrors: Boolean(meta.hasErrors),
      errors: Array.isArray(meta.errors) ? (meta.errors as SuggestedMeta['errors']) : [],
    };
  }
}
