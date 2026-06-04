using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Services;

namespace Vehicle_Booking_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login([FromBody] LoginUserDto request)
        {
            var result = await _authService.LoginAsync(request);
            if (result == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken([FromBody] RefreshTokenRequestDto request)
        {
            var result = await _authService.RefreshTokenAsync(request);
            if (result == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
        {
            await _authService.ForgotPasswordAsync(request);

            return Ok(new
            {
                message = "If this email exists, a password reset OTP has been sent."
            });
        }

        [AllowAnonymous]
        [HttpPost("verify-reset-otp")]
        public async Task<ActionResult<VerifyResetOtpResponseDto>> VerifyResetOtp(
            [FromBody] VerifyResetOtpRequestDto request)
        {
            var result = await _authService.VerifyResetOtpAsync(request);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Invalid or expired OTP."
                });
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto request)
        {
            var result = await _authService.ResetPasswordAsync(request);

            if (!result)
            {
                return BadRequest(new
                {
                    message = "Password reset failed. Please request a new OTP."
                });
            }

            return Ok(new
            {
                message = "Password reset successful."
            });
        }

        [Authorize]
        [HttpGet("authenticated-only")]
        public IActionResult AuthenticatedOnlyEndpoint()
        {
            return Ok("You are authenticated.");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are authenticated as an admin.");
        }
    }
}
