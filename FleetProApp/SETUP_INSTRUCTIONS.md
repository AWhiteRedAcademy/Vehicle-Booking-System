# Vehicle-Booking-System

## Setup Instructions

### First Time Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo>
   cd FleetProApp
   ```

2. **Generate .env file**
   ```bash
   chmod +x setup-env.sh
   ./setup-env.sh
   ```

3. **Follow the prompts**
   - Enter your database host
   - Enter database port
   - Enter database username
   - Enter database password (will be hidden)
   - Enter database name

   Example input:
   ```
   Database Host (default: 152.110.30.40): 152.110.30.40
   Database Port (default: 25432): 25432
   Database Username (default: vbs26): vbs26
   Database Password: Scoobydoo99
   Database Name (default: vehiclebookdb): vehiclebookdb
   ```

4. **Start the application**
   ```bash
   docker compose up
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:80

### For Subsequent Setups

If you need to reconfigure the `.env` file:
```bash
./setup-env.sh
```

The script will ask if you want to overwrite the existing `.env` file.

## Security Notes

- **Never commit `.env` to Git** - it's in `.gitignore`
- `.env.example` is a template showing required variables
- Store real credentials securely (1Password, LastPass, or team vault)
- Share credentials via your team's secret manager, not via email/Slack
- Each team member should run `setup-env.sh` locally

## Troubleshooting

**Issue: "permission denied" when running setup-env.sh**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

**Issue: .env file not being read**
- Ensure `.env` is in the project root (same directory as docker-compose.yml)
- Restart containers: `docker compose down && docker compose up`

**Issue: Database connection fails**
- Verify credentials with your team lead
- Check if database host/port is reachable
- Ensure database exists

## File Structure
```
FleetProApp/
├── .env                  (LOCAL - never commit)
├── .env.example          (TEMPLATE - committed to Git)
├── setup-env.sh          (SETUP SCRIPT - committed to Git)
├── docker-compose.yml
├── frontend/
└── backend/
```
