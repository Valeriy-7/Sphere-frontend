import { format as fnsFormat, format as formatFns, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DATE_FORMAT, DATE_FORMAT_SERVER_ORM } from '@/lib/constants/date';
export function formatDate(
  val: Date | string | null | undefined,
  format: string = DATE_FORMAT,
): string {
  const options = { locale: ru };
  try {
    if (!val) return '';
    if (typeof val === 'string') {
      return fnsFormat(new Date(val), format, options);
    }
    return formatFns(val, format, options);
  } catch (e) {
    console.error({
      e,
      val,
      format,
      options,
    });
    throw e;
    // return String(val);
  }
}

export function parseDateOrm(val:string){
  return parse(val,DATE_FORMAT_SERVER_ORM, new Date())
}

export function formatDateOrm(val:string){
  const result = parse(val, 'dd.MM.yy', new Date())
  return formatDate(result)
}
