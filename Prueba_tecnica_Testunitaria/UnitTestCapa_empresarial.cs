namespace Prueba_tecnica_Testunitaria
{
    [TestClass]
    public class UnitTestCapa_empresarial
    {

        [TestMethod]
        public void TestMethod_Capa_empresarial()
        {

            var result = Prueba_tecnica_amaris.Capa_empresarial.EmployeesDao.listar();
            Assert.IsNotNull(result);

        }

    }
}