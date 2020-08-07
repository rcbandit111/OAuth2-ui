export class DateUtil {

  public static offsetDate(value: string) : string {
    let date = new Date(value);
    let time = date.getTime();

    let final;

    final = date.getTimezoneOffset() <= 0
      ? time + (Math.abs(date.getTimezoneOffset() * 60000))
      : time + (-Math.abs(date.getTimezoneOffset()) * 60000);

    date.setTime(final);

    return date.toISOString();
  }
}
