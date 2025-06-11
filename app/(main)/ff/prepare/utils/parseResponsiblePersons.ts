interface ResponsiblePerson {
  id: string;
  name: string;
}

/**
 * Parses responsible person data from delivery object
 * Handles both new JSON array format and legacy string format
 */
export function parseResponsiblePersons(
  responsiblePersons: ResponsiblePerson[] | undefined,
  responsiblePerson: string | undefined,
  workers: ResponsiblePerson[] = []
): ResponsiblePerson[] {
  // First try responsiblePersons array (from ff_deliveries table)
  if (responsiblePersons && Array.isArray(responsiblePersons) && responsiblePersons.length > 0) {
    const validResponsibles = responsiblePersons.filter(person => 
      person && typeof person === 'object' && person.id && person.name
    );
    
    if (validResponsibles.length > 0) {
      return validResponsibles;
    }
  }
  
  // Then try responsiblePerson string (from deliveries table)
  if (responsiblePerson) {
    // Try to parse as JSON array first (for multiple responsible persons)
    try {
      const parsedIds = JSON.parse(responsiblePerson);
      if (Array.isArray(parsedIds) && parsedIds.length > 0) {
        // Match IDs with workers to get names
        const matchedWorkers = parsedIds
          .map(id => workers.find(worker => worker.id === id))
          .filter(worker => worker !== undefined) as ResponsiblePerson[];
        
        if (matchedWorkers.length > 0) {
          return matchedWorkers;
        }
      }
    } catch (e) {
      // Not JSON, continue with single person logic
    }
    
    // Handle single responsible person (legacy format)
    const matchedWorker = workers.find(worker => worker.name === responsiblePerson);
    if (matchedWorker) {
      return [matchedWorker];
    }
    
    // Try to match by ID
    const matchedById = workers.find(worker => worker.id === responsiblePerson);
    if (matchedById) {
      return [matchedById];
    }
    
    // Create placeholder if no match found
    return [{
      id: 'unknown',
      name: responsiblePerson
    }];
  }
  
  // No responsible person assigned
  return [];
}

/**
 * Gets display names for responsible persons
 */
export function getResponsiblePersonsDisplayNames(
  responsiblePersons: ResponsiblePerson[] | undefined,
  responsiblePerson: string | undefined,
  workers: ResponsiblePerson[] = []
): string {
  const parsed = parseResponsiblePersons(responsiblePersons, responsiblePerson, workers);
  
  if (parsed.length === 0) {
    return 'Не назначен';
  }
  
  return parsed.map(person => person.name).join(', ');
} 