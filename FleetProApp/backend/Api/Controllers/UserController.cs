using Application.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleBook.Application.DTOs;
using VehicleBook.Application.Services;

namespace Vehicle_Booking_System.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers([FromQuery] UserQueryObject query)
        {
            var users = await _userService.GetAllUsersAsync(query);
            return Ok(users);
        }



        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // [AllowAnonymous]
        // [HttpPost("register")]
        // // Authorize this endpoint to allow only Admins to create new users, but allow anyone to register themselves as a user

        // public async Task<IActionResult> RegisterUser([FromBody] CreateUserDto userDto)
        // {
        //     if (userDto.PhoneNumber.Length > 10 || userDto.PhoneNumber.Length < 10)
        //         return ValidationProblem("Phone Number Needs to be exactly 10 digits");

        //     switch (userDto.Role)
        //     {
        //         case "Admin":
        //             break;
        //         case "Company":
        //             break;
        //         case "Owner":
        //             break;
        //         default: return ValidationProblem("Invalid Role Selected, Can only be: Admin,Company,Owner");
        //     }

        //     var user = await _userService.CreateUserAsync(userDto);
        //     return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        // }
        // -----------------------------------------------------
        //         Anonymous person sends role = "Admin"
        // ↓
        // [AllowAnonymous] lets them access the endpoint
        // ↓
        // switch checks that "Admin" is a valid role
        // ↓
        // CreateUserAsync(userDto) saves the user
        // ↓
        // Bob becomes Admin

        // DANGEROUS

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto userDto)
        {

            try
            {
                var createUserDto = new CreateUserDto
                {

                    //   // User does NOT send role
                    // System decides the role
                    Name = userDto.Name,
                    Email = userDto.Email,
                    PhoneNumber = userDto.PhoneNumber,
                    Password = userDto.Password,
                    Role = UserRole.Guest.ToString()
                };

                var user = await _userService.CreateUserAsync(createUserDto);

                return CreatedAtAction(
                    nameof(GetUserById),
                    new { id = user.UserId },
                    user
                );
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Registration failed. Please try again." });
            }
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUserByAdmin([FromBody] CreateUserDto userDto)
        {
            var user = await _userService.CreateUserAsync(userDto);

            return CreatedAtAction(
                nameof(GetUserById),
                new { id = user.UserId },
                user
            );
        }

        // [HttpPut("{id:int}")]
        // public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto userDto)
        // {
        //     var updated = await _userService.UpdateUserAsync(id, userDto);
        //     if (!updated)
        //     {
        //         return NotFound();
        //     }

        //     return NoContent();
        // }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto userDto)
        {
            var updated = await _userService.UpdateUserAsync(id, userDto);

            if (!updated)
                return NotFound();

            return NoContent();
        }



        // [HttpDelete("{id:int}")]
        // public async Task<IActionResult> DeleteUser(int id)
        // {
        //     var deleted = await _userService.DeleteUserAsync(id);
        //     if (!deleted)
        //     {
        //         return NotFound();
        //     }

        //     return NoContent();
        // }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
