import config from '../../config';
import apiCall, { isValidFormat } from '../../utils/apiCall';

export class SuggestedRepository {
  static async getSuggested() {
    try {
      const response = await apiCall(config.server, '/api/suggested/form-values', 'GET');
      return SuggestedRepository.normalizeResponse(response);
    } catch (error) {
      console.error('Error fetching suggested cross sections:', error);
      throw error;
    }
  }

  static normalizeResponse(response) {
    if (!isValidFormat(response)) {
      console.error('Unexpected response format:', response);
      return SuggestedRepository.emptyResult('Unexpected response format');
    }

    const { data = null, meta = null } = response;

    if (!data || typeof data !== 'object') {
      console.warn('Response data is not an object:', data);
      return SuggestedRepository.emptyResult('Response data is not an object');
    }

    return {
      data: {
        motor: SuggestedRepository.ensureMotorStructure(data.motor),
        customer: SuggestedRepository.ensureSuggestionStructure(data.customer),
      },
      meta: SuggestedRepository.ensureMetaStructure(meta),
    };
  }

  static emptyResult(message) {
    return {
      data: {
        motor: SuggestedRepository.emptyMotorSuggestions(),
        customer: SuggestedRepository.emptySuggestion(),
      },
      meta: {
        hasErrors: true,
        errors: [{ scope: 'response', message, details: null }],
      },
    };
  }

  static emptySuggestion() {
    return { data: [], error: null, details: null };
  }

  static emptyMotorSuggestions() {
    return {
      crossSection: SuggestedRepository.emptySuggestion(),
      step: SuggestedRepository.emptySuggestion(),
      manufacturer: SuggestedRepository.emptySuggestion(),
      description: SuggestedRepository.emptySuggestion(),
    };
  }

  static ensureSuggestionStructure(value) {
    if (!value || typeof value !== 'object') {
      return SuggestedRepository.emptySuggestion();
    }

    return {
      data: Array.isArray(value.data) ? value.data : [],
      error: value.error ?? null,
      details: value.details ?? null,
    };
  }

  static ensureMotorStructure(motor) {
    if (!motor || typeof motor !== 'object') {
      return SuggestedRepository.emptyMotorSuggestions();
    }

    return {
      crossSection: SuggestedRepository.ensureSuggestionStructure(motor.crossSection),
      step: SuggestedRepository.ensureSuggestionStructure(motor.step),
      manufacturer: SuggestedRepository.ensureSuggestionStructure(motor.manufacturer),
      description: SuggestedRepository.ensureSuggestionStructure(motor.description),
    };
  }

  static ensureMetaStructure(meta) {
    if (!meta || typeof meta !== 'object') {
      return { hasErrors: false, errors: [] };
    }

    return {
      hasErrors: Boolean(meta.hasErrors),
      errors: Array.isArray(meta.errors) ? meta.errors : [],
    };
  }
}
