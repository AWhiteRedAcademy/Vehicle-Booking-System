using System.ComponentModel.DataAnnotations;

namespace VehicleBook.Application.DTOs
{

    public record ForgotPasswordRequestDto([Required][EmailAddress] string Email);


    public record VerifyResetOtpDto([Required][EmailAddress] string Email, [Required] string Code);

   
    public record ResetPasswordDto(
        [Required][EmailAddress] string Email,
        [Required][StringLength(255, MinimumLength = 6)] string NewPassword
    );
}
