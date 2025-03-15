import unittest
from mainAPI import app

class unitTestcases(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_legislation(self):
        response = self.app.get("/api/legislation?state=CA&bill_number=AB123&session_year=2025&subjects=Education&sponsors=John%20Doe")
        self.assertEqual(response.status_code, 200)
        self.assertIn("legislation", response.json)

    def test_get_legislation_by_id(self):
        response = self.app.get("/api/legislation/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)

    def test_get_legislation_by_id_not_found(self):
        response = self.app.get("/api/legislation/999999")  # Assuming this ID doesn't exist
        self.assertEqual(response.status_code, 404)
        self.assertIn("error", response.json)

    def test_get_police_incidents(self):
        response = self.app.get("/api/violence?state=TX&city=Dallas&cause_of_death=Gunshot")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_get_police_incident_by_id(self):
        response = self.app.get("/api/violence/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)

    def test_get_police_incident_by_id_not_found(self):
        response = self.app.get("/api/violence/999999")  # Assuming this ID doesn't exist
        self.assertEqual(response.status_code, 404)
        self.assertIn("error", response.json)

    def test_get_departments(self):
        response = self.app.get("/api/departments?page=1&per_page=10&state=IL&agency_name=CHICAGO&agency_type=police-department")
        self.assertEqual(response.status_code, 200)
        self.assertIn("departments", response.json)

    def test_get_departments_by_id(self):
        response = self.app.get("/api/departments/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json)

    def test_get_legislation_pagination(self):
        response = self.app.get("/api/legislation?page=2&per_page=5")
        self.assertEqual(response.status_code, 200)
        self.assertIn("legislation", response.json)
        self.assertEqual(response.json["current_page"], 2)

    def test_get_departments_pagination(self):
        response = self.app.get("/api/departments?page=3&per_page=7")
        self.assertEqual(response.status_code, 200)
        self.assertIn("departments", response.json)
        self.assertEqual(response.json["current_page"], 3)

if __name__ == "__main__":
    unittest.main()
