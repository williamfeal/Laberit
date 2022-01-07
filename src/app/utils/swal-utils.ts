import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export class SwalUtils {

  /**
   * Simple alert for errors/info/warnings
   * Only accept button
   * No custom class
   *
   * @param title of the alert
   * @param text of the alert
   * @param type of the alert (success, error, warning, info)
   */
  public static showSimpleAlert(title: string, text: string, type: SweetAlertIcon): Promise<SweetAlertResult<any>> {
    return Swal.fire(title, text, type).then();
  }

  /**
   * Method that shows an error alert
   *
   * @param title of the alert
   * @param text of the alert
   */
  public static showErrorAlert(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire(title, text, 'info');
  }

  /**
   * Method that shows a success alert
   *
   * @param title of the alert
   * @param text of the alert
   */
  public static showSuccessAlert(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire(title, text, 'success');
  }

}
