import unittest
from mainAPI import app

class unitTestcases(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_legislation_search_query(self):
        response = self.app.get("/api/legislation?search=education")
        self.assertEqual(response.status_code, 200)
        self.assertIn("legislation", response.json)

    def test_legislation_sort_by_title(self):
        response = self.app.get("/api/legislation?sort_by=title&sort_order=asc")
        self.assertEqual(response.status_code, 200)
        self.assertIn("legislation", response.json)

    def test_legislation_invalid_sort_by(self):
        response = self.app.get("/api/legislation?sort_by=not_a_column")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json)

    def test_get_incidents_with_search(self):
        response = self.app.get("/api/incidents?search=gun")
        self.assertEqual(response.status_code, 200)
        self.assertIn("incidents", response.json)

    def test_incident_sort_by_city_desc(self):
        response = self.app.get("/api/incidents?sort_by=city&sort_order=desc")
        self.assertEqual(response.status_code, 200)
        self.assertIn("incidents", response.json)

    def test_incidents_invalid_sort_by(self):
        response = self.app.get("/api/incidents?sort_by=invalid_column")
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json)

    def test_agencies_search_term(self):
        response = self.app.get("/api/agencies?search=police")
        self.assertEqual(response.status_code, 200)
        self.assertIn("departments", response.json)

    def test_agencies_sort_by_name(self):
        response = self.app.get("/api/agencies?sort_by=agency_name&sort_order=asc")
        self.assertEqual(response.status_code, 200)
        self.assertIn("departments", response.json)

    def test_agency_by_invalid_id(self):
        response = self.app.get("/api/agencies/999999")  # Nonexistent ID
        self.assertEqual(response.status_code, 404)
        self.assertIn("error", response.json)

    def test_get_root_info(self):
        response = self.app.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json)
        self.assertEqual(response.json["message"], "JusticeWatch API")

if __name__ == "__main__":
    unittest.main()
